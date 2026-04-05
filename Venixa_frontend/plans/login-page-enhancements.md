# Login Page Enhancements Plan

## Overview
This plan outlines the implementation of three key features for the existing login page:
1. Forgot Password functionality
2. Terms and Conditions & Privacy Policy links with restricted content
3. Two-Factor Authentication (2FA) functionality

## Current State Analysis
- **Login.tsx**: Has a placeholder "Forgot password?" link (line 164-166) that points to "#"
- **Signup.tsx**: No terms/privacy links currently
- **Routing**: Login and Signup are standalone pages (not wrapped in AppLayout)
- **UI Framework**: Using Tailwind CSS with custom orange theme

## Implementation Plan

### 1. Forgot Password Page (`src/pages/ForgotPassword.tsx`)
**Purpose**: Allow users to request a password reset email

**Features**:
- Email input field with validation
- Submit button to send reset link
- Success/error state display
- Back to login link
- Same visual design as Login page (left panel with branding, right panel with form)

**UI Components**:
- Email input field
- Submit button
- Success message with instructions
- Error handling for invalid emails
- Link back to login page

### 2. Terms and Conditions Page (`src/pages/TermsAndConditions.tsx`)
**Purpose**: Display restricted terms and conditions content

**Features**:
- Full terms and conditions text
- Restricted content notice
- Accept/Decline buttons (if accessed during signup)
- Back navigation
- Print-friendly layout

**Content Sections**:
- Introduction
- User obligations
- Service terms
- Payment terms
- Intellectual property
- Limitation of liability
- Termination
- Governing law

### 3. Privacy Policy Page (`src/pages/PrivacyPolicy.tsx`)
**Purpose**: Display restricted privacy policy content

**Features**:
- Full privacy policy text
- Restricted content notice
- Accept/Decline buttons (if accessed during signup)
- Back navigation
- Print-friendly layout

**Content Sections**:
- Information collection
- Use of information
- Data sharing
- Data security
- User rights
- Cookies policy
- Children's privacy
- Policy updates

### 4. Two-Factor Authentication Page (`src/pages/TwoFactorAuth.tsx`)
**Purpose**: Verify user identity with 2FA code

**Features**:
- 6-digit code input (using InputOTP component)
- Resend code functionality
- Timer for code expiration
- Error handling for invalid codes
- Success redirect to dashboard
- Option to use backup codes

**UI Components**:
- OTP input field (6 digits)
- Verify button
- Resend code link
- Timer display
- Error messages
- Backup code option

### 5. Login.tsx Updates
**Changes Required**:

#### A. Forgot Password Link
- Update the existing "Forgot password?" link to navigate to `/forgot-password`
- Use React Router's `useNavigate` or `Link` component

#### B. Terms and Conditions Link
- Add a checkbox: "I agree to the Terms and Conditions"
- Add link to `/terms-and-conditions`
- Make checkbox required for form submission

#### C. Privacy Policy Link
- Add a link to `/privacy-policy` in the footer area
- Text: "By signing in, you agree to our Privacy Policy"

#### D. Two-Factor Authentication Flow
- Add state management for 2FA flow
- After successful login credentials, check if 2FA is enabled
- If enabled, redirect to `/two-factor-auth`
- Store temporary auth token for 2FA verification

### 6. Routing Updates (`src/main.tsx`)
**New Routes to Add**:
```tsx
<Route path="/forgot-password" element={<ForgotPassword />} />
<Route path="/terms-and-conditions" element={<TermsAndConditions />} />
<Route path="/privacy-policy" element={<PrivacyPolicy />} />
<Route path="/two-factor-auth" element={<TwoFactorAuth />} />
```

## File Structure
```
src/
├── pages/
│   ├── Login.tsx (modify)
│   ├── ForgotPassword.tsx (new)
│   ├── TermsAndConditions.tsx (new)
│   ├── PrivacyPolicy.tsx (new)
│   └── TwoFactorAuth.tsx (new)
├── main.tsx (modify - add routes)
└── components/
    └── ui/
        └── input-otp.tsx (already exists)
```

## Implementation Order
1. Create ForgotPassword page
2. Create TermsAndConditions page
3. Create PrivacyPolicy page
4. Create TwoFactorAuth page
5. Update Login.tsx with all new features
6. Update main.tsx with new routes
7. Test complete flow

## Technical Considerations
- **State Management**: Use React useState for form states
- **Navigation**: Use React Router's useNavigate and Link
- **Validation**: Client-side email validation, OTP validation
- **Styling**: Consistent with existing Login page design
- **Accessibility**: Proper labels, ARIA attributes
- **Error Handling**: User-friendly error messages

## UI/UX Design Notes
- Maintain the same left panel design with branding
- Right panel forms should match Login page styling
- Use orange accent color (#e66a1d) for buttons and links
- Ensure mobile responsiveness
- Add loading states for async operations
- Provide clear feedback for user actions

## Security Considerations
- Email validation on frontend (backend validation required)
- OTP input masking
- Rate limiting for resend code (backend)
- Secure token storage for 2FA flow
- CSRF protection (backend)

## Testing Checklist
- [ ] Forgot password email submission
- [ ] Terms and Conditions page loads correctly
- [ ] Privacy Policy page loads correctly
- [ ] 2FA code input accepts 6 digits
- [ ] 2FA verification works correctly
- [ ] All navigation links work
- [ ] Form validation works
- [ ] Error states display correctly
- [ ] Mobile responsiveness
- [ ] Accessibility compliance
