// curl \
// -H 'Content-Type: application/json' \
// -d '{"contents":[{"parts":[{"text":"Write a story about a magic backpack"}]}]}' \
// -X POST 'https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=YOUR_API_KEY'

// function geminiQuery(query, apiKey) {
//   return fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=${apiKey}`, {
//     method: 'POST',
//     headers: {
//         'Content-Type': 'application/json'
//     },
//     body: JSON.stringify({
//         'contents': [
//             {
//                 'parts': [
//                     {
//                         'text': query
//                     }
//                 ]
//             }
//         ]
//     })
//   }).then(response => {
//       if (!response.ok) {
//           return response.json().then(error => {
//               console.error('API call failed:', error);
//               throw new Error('API call failed with response: ' + response.status);
//           });
//       }
//       return response.json();
//   }).then(data => {
//       return data['candidates'][0]['content']['parts'][0]['text'];  // Make sure to return the actual data for further processing
//   }).catch(error => {
//       console.error('Error:', error);
//       return 'apiFail';
//   });
// }

function geminiQuery(query, apiKey, retryCount = 0, tryOnce=false) {
  const maxRetries = 5;
  const retryInterval = 5000; // 5 seconds in milliseconds

  return fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=${apiKey}`, {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json'
    },
    body: JSON.stringify({
        'contents': [
            {
                'parts': [
                    {
                        'text': query
                    }
                ]
            }
        ]
    })
  }).then(response => {
      if (!response.ok) {
          return response.json().then(error => {
              console.error('API call failed:', error);
              throw new Error('API call failed with response: ' + response.status);
          });
      }
      return response.json();
  }).then(data => {
      return data['candidates'][0]['content']['parts'][0]['text'];  // Make sure to return the actual data for further processing
  }).catch(error => {
      console.error('Error:', error);
      if (!tryOnce) {
        if (retryCount < maxRetries) {
          console.log(`Retrying in ${retryInterval / 1000} seconds (${retryCount + 1}/${maxRetries})...`);
          return new Promise(resolve => {
            setTimeout(() => {
              resolve(geminiQuery(query, apiKey, retryCount + 1));
            }, retryInterval);
          });
        } else {
          return 'apiFail';
        }
      }else{
        return 'apiFail'
      }
  });
}