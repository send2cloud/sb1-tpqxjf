# QuickStore: Disposable Storefronts

QuickStore is a SAAS application that allows users to create disposable simple storefronts. Users can add a product or service, set a price, and share links. When customers click on the link, they can buy with Apple Pay (using Stripe).

## Getting Started

1. Clone this repository
2. Install dependencies:
   ```
   npm install
   ```
3. Replace the Stripe publishable key:
   Open `src/App.tsx` and replace the placeholder Stripe publishable key with your actual key:
   ```javascript
   const stripePromise = loadStripe('your_actual_stripe_publishable_key');
   ```
4. Start the development server:
   ```
   npm run dev
   ```

## Features

- Create disposable storefronts
- Set product name, description, and price
- Share unique storefront links
- Accept payments via Apple Pay (Stripe integration)

## Important Notes

- This is a frontend-only implementation. In a production environment, you would need to implement a backend to handle storefront creation, product management, and payment processing.
- Make sure to replace the Stripe publishable key with your actual key before deploying.
- Implement proper error handling and validation in a production environment.
- Add user authentication and authorization for a full-featured application.
- Handle Stripe payment intents and webhooks on the server-side in a real-world scenario.

## Technologies Used

- React
- TypeScript
- Vite
- Tailwind CSS
- Stripe (for payments)
- React Router (for navigation)

## License

This project is licensed under the MIT License.