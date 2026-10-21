## Demo login

Choose either role on the login page:

- **Employee** — can view orders and order details.
- **Manager** — can also access the Admin page.


## Included features

- Vue Router routes and dynamic order-detail route
- Pinia authentication and orders stores
- Route guards for authentication and manager-only access
- Order search and status filter
- Order detail page and status updates
- Product detail route with a local mock service
- Responsive layout and status badges

## Notes

- Orders are stored in Pinia memory. Refreshing the page resets order status changes.
- The demo login is persisted with `localStorage` for convenience.
- Product information is returned from a mock service. Replace it with a real API call when connecting a backend.
