import React, { useState, useEffect } from 'react';
import MainGrid from '../src/components/MainGrid';
import Box from '../src/components/Box';
import { AlurakutMenu, AlurakutProfileSidebarMenuDefault, OrkutNostalgicIconSet } from '../src/lib/AlurakutCommons'
import { ProfileRelationsBoxWrapper } from '../src/components/ProfileRelationsBoxWrapper';
import ProfileRelations from '../src/components/ProfileRelations';
import { getFollowers } from '../src/services/Communication'

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

export default function Home() {
  const githubUser = 'omariosouto';
  const confiavel = 3;
  const legal = 3;
  const sexy = 3;
  const recados = 5 
  const fotos = 10 
  const videos = 2 
  const fas = 5
  const mensagens = 10
  const pessoasFavoritas = [
    {
      id: 1,
      title: 'juunegreiros',
      link: `/users/juunegreiros`,
      image: `https://github.com/juunegreiros.png`
    },
    {
      id: 2,
      title: 'peas',
      link: `/users/peas`,
      image: `https://github.com/peas.png`
    },
    {
      id: 3,
      title: 'omariosouto',
      link: `/users/omariosouto`,
      image: `https://github.com/omariosouto.png`
    },
    {
      id: 4,
      title: 'rafaballerini',
      link: `/users/rafaballerini`,
      image: `https://github.com/rafaballerini.png`
    },
    {
      id: 5,
      title: 'marcobrunodev',
      link: `/users/marcobrunodev`,
      image: `https://github.com/marcobrunodev.png`
    },
    {
      id: 6,
      title: 'felipefialho',
      link: `/users/felipefialho`,
      image: `https://github.com/felipefialho.png`
    },
    {
      id: 7,
      title: 'omariosouto',
      link: `/users/omariosouto`,
      image: `https://github.com/omariosouto.png`
    }
  ];
  
  const [comunidades, setComunidades] = useState([]);
  const [followers, setFollowers] = useState([])

  const createCommunityHandler = (event) => {
    event.preventDefault();
    const dados = new FormData(event.target);
    
    setComunidades([
      ...comunidades,
      {
        id: new Date().toISOString(),
        title:  dados.get('title'),
        link: dados.get('url'),
        image: dados.get('image')
      }
    ])
    
  }

  const getAndTreatFollowers = async () => {
    const gotFollowers = await getFollowers(githubUser);
    console.log(gotFollowers);
    const treatedFollowers = gotFollowers.map( follower => {
      const url = `https://github.com/${follower.login}`
      return {
        id: follower.id,
        link: url,
        image: follower.avatar_url,
        title: follower.login
      }
    })

    setFollowers(treatedFollowers)
  }

  useEffect( () => {
    getAndTreatFollowers();
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
          <ProfileRelations title="Pessoas da comunidade" list={pessoasFavoritas} />
          <ProfileRelations title="Seguidores" list={followers} />
        </div>
      </MainGrid>
    </>
  );
}
