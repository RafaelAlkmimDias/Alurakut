import React, { useState, useEffect } from 'react';
import { ProfileRelationsBoxWrapper } from '../ProfileRelationsBoxWrapper';


const ProfileRelations = ({ title, list }) => {

    const [showList, setShowList] = useState([]);
    const hasList = Boolean(showList.length);
    
    useEffect(() => {
        let tempList = [...list];
        let qty = 0
        let newList = []
        while(tempList.length !== 0 && qty < 6){
            let index = Math.floor(Math.random()*tempList.length);
            newList =  [ ...newList, tempList[index] ];
            tempList.splice(index, 1);

            qty++;
        }
        
        setShowList(newList);

    }, [list]);
    
    return (<ProfileRelationsBoxWrapper>
                <h2 className="smallTitle">
                { title } ({ list.length })
                </h2>

                <ul>
                {hasList && showList.map( ( item ) => {
                    return (
                    <li  key={item.id}>
                        <a href={item.link}>
                        <img src={item.image} />
                        <span>{item.title}</span>
                        </a>
                    </li>
                    )
                })}
                </ul>
            </ProfileRelationsBoxWrapper>
    )
}

export default ProfileRelations;