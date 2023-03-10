import { AppI18nLang, langs } from '@kry/i18n';
import { Component, Host, h, Prop, Event, EventEmitter } from '@stencil/core';

@Component({
  tag: 'kry-card-satellite',
  styleUrl: 'card-satellite.styles.scss',
  shadow: true,
})
export class KryCardSatellite {
  @Prop() satname: string;
  @Prop() azimuth: number;
  @Prop() language: AppI18nLang;
  @Prop() satlongitude: number;
  @Prop() satlatitude: number;
  @Prop() eclipsed: boolean;
  @Prop() favorite: boolean;
  @Prop() timestamp: string;

  @Event({ composed: false }) kryFavoriteSatellite: EventEmitter<boolean>;
  @Event({ composed: false }) kryTrackSatellite: EventEmitter<boolean>;

  render() {
    const i18n = langs[this.language].web;
    const satI18n = i18n.satellites;

    const disable = this.satlongitude == 0 || this.satlatitude == 0;

    return (
      <Host>
        <div class={{ wrapper: true, favorite: this.favorite, disable }}>
          <div>
            <p>{this.satname}</p>

            {this.favorite ? (
              <kry-icon
                onClick={() => this.kryFavoriteSatellite.emit(false)}
                name="ri-heart-3-fill"
              />
            ) : (
              <kry-icon
                onClick={() => this.kryFavoriteSatellite.emit(true)}
                name="ri-heart-3-line"
              />
            )}
          </div>

          <div sat-info>
            <span>{satI18n.longitude}</span>
            <span>{this.satlongitude}</span>
          </div>

          <div sat-info>
            <span>{satI18n.latitude}</span>
            <span>{this.satlatitude}</span>
          </div>

          <div sat-info>
            <span>{satI18n.azimuth}</span>
            <span>{this.azimuth}</span>
          </div>

          <div sat-info>
            <span>{satI18n.eclipsed}</span>
            <span>{this.eclipsed ? i18n.yes : i18n.no}</span>
          </div>

          <div onClick={() => this.kryTrackSatellite.emit(true)}>
            {disable ? (
              <kry-icon name="ri-cloud-off-line" />
            ) : (
              <kry-icon name="ri-pin-distance-fill" />
            )}
            {disable ? satI18n.offline : satI18n.track}
          </div>
        </div>
      </Host>
    );
  }
}
