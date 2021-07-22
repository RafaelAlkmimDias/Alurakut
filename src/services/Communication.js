export const getFollowers = ( user ) => {
    const url = `https://api.github.com/users/${user}/followers`
    
    console.log('user', url)

    const followers =  fetch(url)
        .then( (response) => {
            if(response.ok){
                return response.json()
            } 

            throw new Error('network error ocurred' + response.status);
        })
        .then( (data) => {
            console.log(data)
            return data
        })
        .catch((err) => {
            console.error(err)
            return []
        })

    return followers;
}