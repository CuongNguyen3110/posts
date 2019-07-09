
const endpoint = 'https://api.veritone.com/v3/graphql';

function fetchGraphQLApi(
  query,
  variables
) {
  return fetch(endpoint, {
    method: 'POST',
    body: JSON.stringify({
      query,
      variables
    }),
    headers: {
      'Content-Type': 'application/json'
    }
  }).then(result => result.json());
}

export default fetchGraphQLApi;