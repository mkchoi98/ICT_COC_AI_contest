import React from 'react'
import { Card, List, Icon } from 'antd';
import InfoData from '../Data/InfoData.json'


function ShowCard(str) {

    var strPosition=str.substring(7)

    var list=['성원여객', '삼이택시', '고려운수', '경일운수', '백제운수', '삼익택시', '성원여객', '대하운수', '안전한택시', '양평운수', '기타']

    for(var i=0; i<list.length; i++){

        if(strPosition===InfoData.info[i].name){
            var name=InfoData.info[i].name
            var img_src=InfoData.info[i].img_src
            var title=InfoData.info[i].title
            var address=InfoData.info[i].address
            var http=InfoData.info[i].http

            break
        }
    }

    return (
        <Card
            style={{ width: 200 }}
            cover={
                <img
                    alt={name}
                    src={img_src} />
            }
            actions={[
                <a target="_blank" rel="noopener noreferrer" href={http}>
                    <Icon type="ellipsis" key="ellipsis" />
                </a>
            ]}
        >
            <List.Item.Meta
                title={'< '+title+' > 정보'}
                description={address}
            />

        </Card>
    )
    
}

export default ShowCard