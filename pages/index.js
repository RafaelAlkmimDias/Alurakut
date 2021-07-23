import React, { useState, useEffect } from 'react';
import MainGrid from '../src/components/MainGrid';
import Box from '../src/components/Box';
import { AlurakutMenu, AlurakutProfileSidebarMenuDefault, OrkutNostalgicIconSet } from '../src/lib/AlurakutCommons'
import { ProfileRelationsBoxWrapper } from '../src/components/ProfileRelationsBoxWrapper';
import ProfileRelations from '../src/components/ProfileRelations';
import { 
  getFollowers, 
  getCommunities, 
  postCommunities, 
  getAuth, 
  getFollowing 
} from '../src/services/Communication';
import nookies from 'nookies';
import jwt from 'jsonwebtoken';

function ProfileSideBar({ githubUser }){
  return (
    <Box as="aside">
      <img src={`https://github.com/${githubUser}.png`} style={{ borderRadius: '8px' }} />
      <hr />

      <p>
        <a className="boxLink" href={`https://github.com/${githubUser}`}>
          {githubUser}
        </a>
      </p>
      <hr />

      <AlurakutProfileSidebarMenuDefault />
    </Box>
  )
}

export default function Home( props ) {
  const githubUser = props.githubUser;
  const confiavel = 3;
  const legal = 3;
  const sexy = 3;
  const recados = 5 
  const fotos = 10 
  const videos = 2 
  const fas = 5
  const mensagens = 10
  
  const [comunidades, setComunidades] = useState([]);
  const [followers, setFollowers] = useState([])
  const [following, setFollowing] = useState([])

  const createCommunityHandler = async (event) => {
    event.preventDefault();
    const dados = new FormData(event.target);

    const record = await postCommunities({
      title:  dados.get('title'),
      user: githubUser,
      link: dados.get('url'),
      imageUrl: dados.get('image')
    })

    if(record){
      setComunidades([
        ...comunidades,
        record
      ])
    }
    
  }

  const getAndTreatFollowers = async () => {
    const gotFollowers = await getFollowers(githubUser);

    const treatedFollowers = gotFollowers.map( follower => {
      const url = `https://github.com/${follower.login}`
      return {
        id: follower.id,
        link: url,
        image: follower.avatar_url,
        title: follower.login
      }
    })

    setFollowers(treatedFollowers);
  }

  const getAndTreatFollowings = async () => {
    const gotFollowing = await getFollowing(githubUser);

    const treatedFollowing = gotFollowing.map( following => {
      const url = `https://github.com/${following.login}`
      return {
        id: following.id,
        link: url,
        image: following.avatar_url,
        title: following.login
      }
    })

    setFollowing(treatedFollowing);
    
  }
  const getAndTreatCommunities = async () => {
    const gotCommunities = await getCommunities(githubUser);

    const treatedCommunities = gotCommunities.map( community => {
      return {
        id: community.id,
        link: community.link,
        image: community.imageUrl,
        title: community.title
      }
    })

    setComunidades(treatedCommunities);
  }

  useEffect( () => {
    getAndTreatFollowers();
    getAndTreatCommunities();
    getAndTreatFollowings();
  }, [])

  return (
    <>
      <AlurakutMenu githubUser={githubUser} />
      <MainGrid>
        <div className="profileArea" style={{ gridArea: 'profileArea' }}>
          <ProfileSideBar githubUser={githubUser} />
        </div>
        <div className="welcomeArea" style={{ gridArea: 'welcomeArea' }}>
          <Box>
            <h1 className="title">
              Bem Vindo(a)
            </h1>
            <OrkutNostalgicIconSet 
              confiavel={confiavel} 
              legal={legal} 
              sexy={sexy} 
              recados={recados} 
              fotos={fotos} 
              videos={videos} 
              fas={fas} 
              mensagens={mensagens} 
            />
          </Box>

          <Box>
            <h2 className="subTitle">
              O que você deseja fazer?
            </h2>
            <form onSubmit={createCommunityHandler}>
              <div>
                <input 
                  placeholder="Qual vai ser o nome da sua comunidade?" 
                  name="title" 
                  aria-label="Qual vai ser o nome da sua comunidade?"
                  type="text"
                />
              </div>
              
              <div>
                <input 
                  placeholder="Coloque uma URL para usarmos de capa" 
                  name="image" 
                  aria-label="Coloque uma URL para usarmos de capa"
                  type="text"
                />
              </div>

              <div>
                <input 
                  placeholder="Coloque o Link da comunidade" 
                  name="url" 
                  aria-label="Coloque o Link da comunidade"
                  type="text"
                />
              </div>

              <button>
                Criar Comunidade
              </button>

            </form>
          </Box>
        </div>
        <div className="profileRelationsArea" style={{ gridArea: 'profileRelationsArea' }}>
          <ProfileRelations title="Comunidades" list={comunidades} />
          <ProfileRelations title="Seguindo" list={following} />
          <ProfileRelations title="Seguidores" list={followers} />
        </div>
      </MainGrid>
    </>
  );
}

export async function getServerSideProps(context){
  const cookies = nookies.get(context)
  const token = cookies.USER_TOKEN
  const auth = await getAuth(token)
  if(!auth){
    return {
      redirect:{
        destination: '/login',
        permanent: false
      }
    }
  }

  const decodedInfo = jwt.decode(token)

  return {
    props: {
      githubUser: decodedInfo.githubUser
    },
  }
}