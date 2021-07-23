export const getFollowers = ( user ) => {
    const url = `https://api.github.com/users/${user}/followers`

    const followers =  fetch(url)
    .then( (response) => {
        if(response.ok){
            return response.json()
        } 

        throw new Error('network error ocurred' + response.status);
    })
    .then( (data) => {
        return data
    })
    .catch((err) => {
        console.error(err)
        return []
    })

    return followers;
}

export const getFollowing = ( user ) => {
    const url = `https://api.github.com/users/${user}/following`

    const following =  fetch(url)
    .then( (response) => {
        if(response.ok){
            return response.json()
        } 

        throw new Error('network error ocurred' + response.status);
    })
    .then( (data) => {
        return data
    })
    .catch((err) => {
        console.error(err)
        return []
    })

    return following;
}

export const getUserExists = ( user ) => {
    const url = `https://api.github.com/users/${user}`

    const userExists =  fetch(url)
    .then( (response) => {
        return response.ok;
    })

    return userExists;
}

export const getGitInfo = ( user ) => {
    const url = `https://api.github.com/users/${user}`

    const userInfo =  fetch(url)
    .then( (response) => {
        if(response.ok){
            return response.json()
        } 

        throw new Error('network error ocurred' + response.status);
    })
    .then( (data) => {
        return data
    })
    .catch((err) => {
        console.error(err)
        return []
    })

    return userInfo;
}

export const getCommunities = ( user ) => {

    const url = `https://graphql.datocms.com/`
    const headers = {
        'Authorization': '2272a7a210e33033da18c4062be9e1',
        'Content-Type': 'application/json',
        'Accept': 'application/json',
    }
    const body = JSON.stringify({
        "query": `query {
            allCommunities {
              id
              title
              user
              imageUrl
              link
            }
          }`
    })

    const community = fetch(url, {
        method: 'POST',
        headers: headers,
        body: body
    })
    .then( (response) => {
        if(response.ok){
            return response.json()
        }

        throw new Error('network error ocurred' + response.status);
    })
    .then( (data) => {
        return data.data.allCommunities
    })
    .catch((err) => {
        console.error(err)
        return []
    })

    return community;
}

export const postCommunities = async ( data ) => {
    const url = '/api/community';
    const headers = {
        'Content-Type': 'application/json',
    }

    const post = await fetch(url,{
        method: 'POST',
        headers: headers,
        body: JSON.stringify( data )
    })
    .then( (response) => {
        console.log(response)
        if(response.ok){
            return response.json();
        }
        throw new Error('network error ocurred' + response.status);
    })
    .then( (data) => {
        console.log(data)
        return {
            id: data.record.id,
            title:  data.record.title,
            link: data.record.link,
            image: data.record.imageUrl
        }
    })
    .catch((err) => {
        console.error(err)
        return false;
    })

    return post;
}

export const postLogin = ( githubUser ) => {
    const url = 'https://alurakut.vercel.app/api/login';
    const headers = {
        'Content-Type': 'application/json'
    }
    const body = {
        githubUser: githubUser
    }

    const data = fetch(url,{
        method: 'POST',
        headers: headers,
        body: JSON.stringify(body)
    })
    .then( (response) => {
        if(response.ok){
            return response.json();
        }
        throw new Error('network error ocurred' + response.status);
    })
    .then( ( completeRespose ) => {
        return completeRespose.token
    })
    .catch( (err) => {
        console.error(err)
        return false;
    })

    return data;

} 

export const getAuth = ( token ) => {
    const url = 'https://alurakut-base-rafaelalkmimdias.vercel.app/api/validate_user';
    const header = {
        Authorization: token
    }
    const auth = fetch(url, {
        headers: header
    })
    .then( (response) => {
        if(response.ok){
            return response.json();
        }
        throw new Error('network error ocurred' + response.status);
    })
    .then( (completeResponse) => {
        return completeResponse.exists
    })
    .catch( (err) => {
        console.error(err)
        return false;
    })

    return auth;

}