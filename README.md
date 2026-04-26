# 🍔 Restaurant App

![React Native](https://img.shields.io/badge/react_native-%2320232a.svg?style=for-the-badge&logo=react&logoColor=%2361DAFB)
![Expo](https://img.shields.io/badge/expo-1C1E24?style=for-the-badge&logo=expo&logoColor=#D04A37)
![Firebase](https://img.shields.io/badge/firebase-%23039BE5.svg?style=for-the-badge&logo=firebase)

A comprehensive, full-stack React Native application designed for restaurant food ordering and menu management. This application provides a seamless mobile experience for both standard users and administrators, complete with real-time database updates, user authentication, and an intuitive UI.

## 📱 Features

### User-Facing Features
- **User Authentication**: Secure Login, Registration, and Password Reset functionality.
- **Menu Exploration**: Browse food items organized dynamically by categories.
- **Cart Management**: Add items to the cart, review the order, and proceed to checkout smoothly.
- **User Profiles**: Personalized user experience with profile management.
- **Reviews & Feedback**: Customers can leave reviews and feedback on items.
- **Persistent Sessions**: State and session management keeping users logged in across app restarts.

### Admin Features
- **Dashboard & Management**: Specialized admin interfaces to control the application.
- **Inventory Control**: Add, update, and manage restaurant menu items dynamically.
- **Real-Time Synchronization**: Instant updates to the menu for all users.

## 🛠️ Technology Stack

- **Frontend Framework**: React Native (v0.73)
- **Development Platform**: Expo SDK 50
- **Routing & Navigation**: Expo Router (`expo-router`) & React Navigation
- **Backend as a Service (BaaS)**: Firebase (Authentication, Firestore Database, Firebase Storage)
- **Local Storage**: AsyncStorage (`@react-native-async-storage/async-storage`)
- **UI Components & Styling**: React Native Paper, React Native Safe Area Context
- **Icons & Assets**: `@expo/vector-icons`

## 📂 Folder Structure

```
restaurant-app/
├── app/               # Expo Router entry points & app navigation layout
├── assets/            # Static assets (images, fonts, splash screens)
├── components/        # Reusable UI components (CartItem, AddToCart, Inputs, etc.)
├── firebase/          # Firebase configuration and authentication functions
├── screens/           # Main screen layouts (Home, Login, Register, Review)
├── App.js             # Application entry configuration
└── package.json       # Project dependencies and scripts
```

## 🚀 How to Run Locally

### Prerequisites
Make sure you have the following installed on your machine:
- [Node.js](https://nodejs.org/)
- [Git](https://git-scm.com/)
- [Expo CLI](https://docs.expo.dev/get-started/installation/)

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/MohamedEssam2127/Restaurant-App.git
   cd Restaurant-App
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up Firebase**
   - Create a Firebase project at the [Firebase Console](https://console.firebase.google.com/).
   - Enable Authentication (Email/Password), Firestore Database, and Storage.
   - Replace the `firebaseConfig` details in `firebase/Config.js` with your own Firebase project credentials.

4. **Start the application**
   ```bash
   npx expo start
   ```

5. **Run on Device/Emulator**
   - Press `a` to run on an Android emulator.
   - Press `i` to run on an iOS simulator.
   - Or scan the QR code using the Expo Go app on your physical device.

## 🤝 Contributing
Contributions, issues, and feature requests are welcome! Feel free to check the [issues page](../../issues).

## 📄 License
This project is open-source and available under the [MIT License](LICENSE).
