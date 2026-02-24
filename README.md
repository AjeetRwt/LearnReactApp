🌍 Travel App – React Native CLI

A modern travel exploration mobile UI built using React Native CLI.

This project showcases a clean, minimal travel app design with destination cards, search functionality, category filters, and detailed screens.

Features
👋 Personalized greeting header
🔍 Search bar with filter icon
🏷 Category chips (Most Viewed, Nearby, Latest)

📸 UI Preview
Home Screen includes:
Greeting section
Profile avatar
Search bar
Popular places section
Horizontal scroll cards

🛠 Tech Stack
React Native CLI
React Navigation (Stack + Bottom Tabs)
React Native Vector Icons
Functional Components

## Assingment 2

![App Demo](assets/demo.gif)

📦 Installation
1️⃣ Clone the repository
git clone https://github.com/AjeetRwt/LearnReactApp
cd travel-app

2️⃣ Install dependencies
npm install

3️⃣ iOS only
cd ios
pod install
cd ..

▶️ Run the App
Android
npx react-native run-android

iOS
npx react-native run-ios

📂 Project Structure
src/
├── screens/
│ ├── SplashScreen.js
│ ├── HomeScreen.js
│ └── DetailsScreen.js
│
├── components/
│ └── DestinationCard.js
│
└── navigation/
└── AppNavigator.js
