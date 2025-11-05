# AI Rules for Gabi Cleaning Application

This document outlines the core technologies used in the Gabi Cleaning application and provides clear guidelines for library usage to maintain consistency and best practices.

## 🚀 Tech Stack Overview

*   **Framework**: Next.js (v14.2.28) for building server-rendered React applications.
*   **Language**: TypeScript for type safety, improved code quality, and better developer experience.
*   **Styling**: Tailwind CSS for a utility-first approach to styling, ensuring responsive and consistent design across the application.
*   **UI Components**: shadcn/ui, built on top of Radix UI primitives, for accessible, customizable, and reusable UI components.
*   **Database**: PostgreSQL, managed through Prisma ORM (v6.7.0), for robust and type-safe database interactions.
*   **Email Services**: Nodemailer for sending transactional emails, such as quote requests.
*   **Form Management**: React Hook Form for efficient form state management and validation, paired with Zod for schema-based validation.
*   **Animations**: Framer Motion for declarative and performant animations and transitions.
*   **Icons**: Lucide React for a comprehensive and customizable set of SVG icons.
*   **Date Utilities**: `date-fns` for all date manipulation, formatting, and parsing needs.

## 📚 Library Usage Rules

To ensure consistency and maintainability, please adhere to the following rules when developing or modifying the application:

*   **UI Components**: Always prioritize using components from `shadcn/ui` (found in `nextjs_space/components/ui/`). If a specific component is not available, create a new, small, and focused component using Tailwind CSS.
*   **Styling**: All styling must be implemented using Tailwind CSS classes. Avoid inline styles unless absolutely necessary for dynamic, computed values.
*   **Forms**: For any form creation and validation, use `react-hook-form` for managing form state and `zod` for defining and validating form schemas.
*   **Icons**: All icons used throughout the application should be imported from the `lucide-react` library.
*   **Date Handling**: For date input and selection, utilize the `Calendar` component from `shadcn/ui` (which uses `react-day-picker`). For any date formatting, parsing, or calculations, use `date-fns`.
*   **Animations**: Implement any animations or transitions using the `framer-motion` library.
*   **API Interactions**: Use the native `fetch` API for all client-side data fetching and interactions with API routes.
*   **State Management**: For local component state, use React's built-in `useState` and `useReducer` hooks. Global state management solutions like `jotai` or `zustand` are available but should only be introduced if the complexity of the state explicitly warrants it.
*   **Toasts/Notifications**: For all user notifications and toasts, use the `useToast` hook and `Toaster` component provided by `shadcn/ui` (located in `nextjs_space/hooks/use-toast.ts` and `nextjs_space/components/ui/toaster.tsx`). Do not use `react-hot-toast`.