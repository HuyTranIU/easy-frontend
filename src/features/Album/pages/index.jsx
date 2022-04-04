import React from 'react';
import AlbumList from '../components/AlbumList';

const albumList= [
    {
        id: '1',
        name: 'Đoá Hồng Nhạc Việt',
        thumbanailUrl: 'https://photo-resize-zmp3.zadn.vn/w240_r1x1_jpeg/cover/e/2/9/2/e292dcbfb35b9be7c2ee8f125ce19a6f.jpg'
    },
    {
        id: '2',
        name: 'Đoá Hồng Nhạc Việt',
        thumbanailUrl: 'https://photo-resize-zmp3.zadn.vn/w240_r1x1_jpeg/cover/e/2/9/2/e292dcbfb35b9be7c2ee8f125ce19a6f.jpg'
    },
    {
        id: '3',
        name: 'Đoá Hồng Nhạc Việt',
        thumbanailUrl: 'https://photo-resize-zmp3.zadn.vn/w240_r1x1_jpeg/cover/e/2/9/2/e292dcbfb35b9be7c2ee8f125ce19a6f.jpg'
    },
    {
        id: '4',
        name: 'Đoá Hồng Nhạc Việt',
        thumbanailUrl: 'https://photo-resize-zmp3.zadn.vn/w240_r1x1_jpeg/cover/e/2/9/2/e292dcbfb35b9be7c2ee8f125ce19a6f.jpg'
    },  
    {
        id: '5',
        name: 'Đoá Hồng Nhạc Việt',
        thumbanailUrl: 'https://photo-resize-zmp3.zadn.vn/w240_r1x1_jpeg/cover/e/2/9/2/e292dcbfb35b9be7c2ee8f125ce19a6f.jpg'
    }
];

function AlbumFeatures(props) {
    return (
        <div>
            <AlbumList albumList={albumList}/>
        </div>
    );
}

export default AlbumFeatures;