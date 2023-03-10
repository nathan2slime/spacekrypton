import {
  Component,
  Host,
  h,
  Prop,
  Watch,
  Event,
  EventEmitter,
  Method,
  State,
  Element,
} from '@stencil/core';
import {
  divIcon,
  latLng,
  LeafletMouseEvent,
  Map,
  map,
  Marker,
  marker,
  polyline,
  tileLayer,
  ZoomPanOptions,
} from 'leaflet';

import { KryMapPoint } from './map.model';

import { layers } from './mocks';

@Component({
  tag: 'kry-map',
  styleUrl: 'map.styles.scss',
  shadow: true,
})
export class KryMap {
  @Prop() layer: string = layers.dark;
  @Prop() latitude: number;
  @Prop() longitude: number;
  @Prop() altitude?: number;
  @Prop() controls = true;
  @Prop() markHome: boolean;
  @Prop() unknowIcon: string = 'ri-checkbox-blank-circle-fill';
  @Prop() homeIcon: string = 'ri-map-pin-user-fill';
  @Prop() maxZoom: number = 8;
  @Prop() labelHome: string = '';
  @Prop() track: boolean;
  @Prop() zoom: number = 3;
  @Prop() points: KryMapPoint[] = [];
  @Prop() lines: KryMapPoint[] = [];
  @Prop() minZoom: number = 1;
  @Prop() trace: boolean;

  @State() fullscreen: boolean;

  @Event() kryClickMarkMap: EventEmitter<number>;

  @Element() host: HTMLKryMapElement;

  wrapper: HTMLDivElement;
  view: Map;
  markes: Marker[] = [];

  tooltipConfig = {
    className: 'tooltip',
  };

  getPointIcon = (icon: boolean, name?: string, size: number = 1.25) =>
    divIcon({
      popupAnchor: [0, -20],
      iconAnchor: icon ? [0, 0] : [0, 0],
      html: icon
        ? `<kry-icon style="font-size: ${size}rem" name=${name || this.unknowIcon} />`
        : `<img src="/assets/icons/satellite.svg" />`,
    });

  @Watch('latitude')
  @Watch('longitude')
  listenCoords() {
    if (this.altitude && this.longitude) {
      this.loadMap();
    }
  }

  @Method()
  async onFly(latlang: [number, number], zoom = 6, options?: ZoomPanOptions) {
    this.view.flyTo(latlang, zoom, options);

    const mark = this.markes.find(mark => mark.getLatLng().equals(latlang));
    if (mark?.openPopup) mark?.openPopup();
  }

  @Method()
  async resizeMap() {
    this.view.invalidateSize();
  }

  @Watch('lines')
  traceLine() {
    if (this.trace) {
      const points = this.lines.map(ln => ln.latlng);

      const line = polyline(points, {
        color: 'var(--primary-color-up)',
        weight: 1,
        opacity: 0.4,
        smoothFactor: 1,
      });

      line.addTo(this.view);
    }
  }

  @Watch('points')
  @Watch('latitude')
  @Watch('longitude')
  markPoints() {
    if (!this.track && this.points.length == 1) {
      const mark = this.markes.find(mark =>
        mark.getLatLng().equals(this.points[0].latlng)
      );

      mark.setLatLng(this.points[0].latlng);

      return;
    }

    this.markes.forEach(mark => this.view.removeLayer(mark));
    this.markes = [];

    const mouseEnterPopup = (el: LeafletMouseEvent) => {
      const hover = this.markes.find(mark => mark.getLatLng().equals(el.latlng));
      if (hover) hover.openPopup();
    };

    if (this.markHome && this.latitude && this.longitude) {
      const markHome = marker([this.latitude, this.longitude], {
        icon: this.getPointIcon(true, this.homeIcon),
        opacity: 0.9,
      })
        .addTo(this.view)
        .bindPopup(this.labelHome.toUpperCase(), this.tooltipConfig)
        .on('mousemove', el => mouseEnterPopup(el));

      this.markes.push(markHome);
    }

    this.points.forEach(({ latlng, icon, label, key, size }) => {
      const point = marker(latlng, {
        icon: this.getPointIcon(false, icon, size),
      })
        .addTo(this.view)
        .on('click', () => this.kryClickMarkMap.emit(key))
        .on('mousemove', el => mouseEnterPopup(el));

      if (label) {
        point.bindPopup(label, this.tooltipConfig);
      }

      this.markes.push(point);
    });

    this.view.invalidateSize();
  }

  loadMap() {
    this.view.setView([this.latitude, this.longitude], this.zoom);

    this.markPoints();
    this.traceLine();
  }

  createMap() {
    this.view = map(this.wrapper, {
      zoomControl: false,
      center: latLng(-43.330962, -4.86471, this.altitude),
      zoom: this.zoom,
      minZoom: this.minZoom,
      worldCopyJump: true,
      maxBounds: null,
      layers: [
        tileLayer(this.layer, {
          maxZoom: this.maxZoom,
        }),
      ],
    }).invalidateSize({
      debounceMoveend: false,
      pan: false,
    });

    this.markPoints();
  }

  onFullScreen = () => {
    if (!document.fullscreenElement) {
      this.fullscreen = true;
      document.documentElement.requestFullscreen();
    } else if (document.exitFullscreen) {
      this.fullscreen = false;
      document.exitFullscreen();
    }

    this.view.invalidateSize();
    if (this.fullscreen) this.view.setZoom(4);
  };

  componentDidLoad() {
    this.createMap();
  }

  render() {
    return (
      <Host class={{ fullscreen: this.fullscreen }}>
        <div class={{ wrapper: true }} ref={el => (this.wrapper = el)} />

        {this.controls && (
          <div class={{ controls: true }}>
            <div onClick={() => this.view.zoomIn()}>
              <kry-icon name="ri-zoom-in-line" />
            </div>
            <div onClick={() => this.onFullScreen()}>
              {this.fullscreen ? (
                <kry-icon name="ri-fullscreen-exit-line" />
              ) : (
                <kry-icon name="ri-fullscreen-line" />
              )}
            </div>
            <div onClick={() => this.view.zoomOut()}>
              <kry-icon name="ri-zoom-out-line" />
            </div>
          </div>
        )}
      </Host>
    );
  }
}
