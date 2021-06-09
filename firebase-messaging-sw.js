importScripts('https://www.gstatic.com/firebasejs/8.6.5/firebase-app.js');
importScripts('https://www.gstatic.com/firebasejs/8.6.5/firebase-messaging.js')

// For an optimal experience using Cloud Messaging, also add the Firebase SDK for Analytics.

// Initialize the Firebase app in the service worker by passing in the
// messagingSenderId.

firebase.initializeApp({
    apiKey: "AIzaSyCDe3G4MF8lVB8WME8EIT3Sz5XuQlf-WFU",
    authDomain: "topka-project.firebaseapp.com",
    projectId: "topka-project",
    storageBucket: "topka-project.appspot.com",
    messagingSenderId: "385088330860",
    appId: "1:385088330860:web:e1cd4966950a3321ed4c49"
});
const messaging = firebase.messaging();
// Retrieve an instance of Firebase Messaging so that it can handle background
// messages.


messaging.getToken({ vapidKey: 'BF5dQ3hWKNr548iYBp-hNP3dOJHVrQb7roCA4qRMs8wTu_-7Ica1e0DQxFRoqLSJdRYeviu3JSzZZ92gMs0cOS8' }).then((currentToken) => {
    if (currentToken) {
      // Send the token to your server and update the UI if necessary
      // ...
    } else {
      // Show permission request UI
      console.log('No registration token available. Request permission to generate one.');
      // ...
    }
  }).catch((err) => {
    console.log('An error occurred while retrieving token. ', err);
    // ...
  });


// messaging.onBackgroundMessage((payload) => {
//     registration.showNotification(payload.notification.title, payload.notification);
//   });
messaging.onBackgroundMessage((payload) => {
    console.log('[firebase-messaging-sw.js] Received background message ', payload);
    // Customize notification here
    const notificationTitle = 'Background Message Title';
    const notificationOptions = {
      body: 'Background Message body.',
      icon: '/firebase-logo.png'
    };
  
    self.registration.showNotification(notificationTitle,
      notificationOptions);
  });



// messaging.setBackgroundMessageHandler(function(payload) {

//     // Сохраяем data для получения пареметров в обработчике клика
//     payload.data.data = payload.data;

//     // Показываем уведомление
//      self.registration.showNotification(payload.data.title, payload.data);
// });


// self.addEventListener('notificationclick', function(event) {
//     // извлекаем адрес перехода из параметров уведомления 
//     const target = event.notification.data.click_action || '/';
//     event.notification.close();

//     // этот код должен проверять список открытых вкладок и переключатся на открытую
//     // вкладку с ссылкой если такая есть, иначе открывает новую вкладку
//     event.waitUntil(clients.matchAll({
//         type: 'window',
//         includeUncontrolled: true
//     }).then(function(clientList) {
//         // clientList почему-то всегда пуст!?
//         for (var i = 0; i < clientList.length; i++) {
//             var client = clientList[i];
//             if (client.url == target && 'focus' in client) {
//                 return client.focus();
//             }
//         }

//         // Открываем новое окно
//         return clients.openWindow(target);
//     }));
// });