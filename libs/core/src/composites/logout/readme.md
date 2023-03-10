# kry-logout

<!-- Auto Generated Below -->

## Properties

| Property   | Attribute  | Description | Type              | Default     |
| ---------- | ---------- | ----------- | ----------------- | ----------- |
| `avatar`   | `avatar`   |             | `string`          | `undefined` |
| `email`    | `email`    |             | `string`          | `undefined` |
| `language` | `language` |             | `"en" \| "pt-BR"` | `undefined` |
| `open`     | `open`     |             | `boolean`         | `undefined` |
| `username` | `username` |             | `string`          | `undefined` |

## Events

| Event               | Description | Type                   |
| ------------------- | ----------- | ---------------------- |
| `kryDialogLogout`   |             | `CustomEvent<boolean>` |
| `kryRedirect`       |             | `CustomEvent<string>`  |
| `kryToggleDropdown` |             | `CustomEvent<boolean>` |

## Dependencies

### Used by

- [kry-sidebar](../sidebar)

### Depends on

- [kry-dropdown](../../components/dropdown)
- [kry-dropdown-item](../../components/dropdown-item)
- [kry-icon](../../components/icon)

### Graph

```mermaid
graph TD;
  kry-logout --> kry-dropdown
  kry-logout --> kry-dropdown-item
  kry-logout --> kry-icon
  kry-dropdown-item --> kry-icon
  kry-sidebar --> kry-logout
  style kry-logout fill:#f9f,stroke:#333,stroke-width:4px
```

---

_Built with [StencilJS](https://stenciljs.com/)_
