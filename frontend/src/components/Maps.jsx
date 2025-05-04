import React from 'react'
import { MapContainer, TileLayer, Marker, Popup, Tooltip } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';

export const Maps = () => {

    const customIcon = L.icon({
        iconUrl: '/img/markerImg.png',
        iconSize: [32, 32],       // tamaño del ícono
        iconAnchor: [16, 32],     // punto donde se "ancla" el ícono
        popupAnchor: [0, -32],    // posición del popup respecto al ícono
    });

    return (
        <MapContainer 
        center={[43.44784457220318, -3.8511639374310875]} 
        zoom={14} 
        className='z-0 h-[250px] md:h-[500px] w-full'
        >
            <TileLayer
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                attribution="&copy; CINEMA JUSTIN"
            />
            <Marker
                position={[43.44784457220318, -3.8511639374310875]}
                draggable={false}
                icon={customIcon}
                title='IES Augusto Linares'
            >
                <Tooltip permanent direction="top" offset={[0, -20]}>
                    Cinema
                </Tooltip>
                <Popup className='text-xl text-black'>IES Augusto Linares</Popup>
            </Marker>
        </MapContainer>
    )
}
