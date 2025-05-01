import React, { useEffect, useState } from 'react'
import { Textarea, User } from "@heroui/react";
import { MyButton } from './MyButton';
import axios from 'axios';
import { useLocation } from 'react-router-dom';

export const CommentsMovie = () => {
    const [textArea, setTextArea] = useState('');
    const [data, setData] = useState([]);
    const location = useLocation();
    const movieId = location.pathname.split('/').pop();
    const [user, setUser] = useState(() => {
        const user = localStorage.getItem('userActive');
        const name = user ? JSON.parse(user).name : '';
        return name;
    });

    const reloadComments = () => {
        axios.get(`http://192.168.1.238:3001/comments/${movieId}`)
            .then((res) => setData(res.data))
            .catch((err) => console.log('Error al cargar comentarios: ' + err));
    };

    const handleTextArea = () => {
        const existingComment = data.find(item => item.nameuser === user);
        const request = existingComment
            ? axios.put(`http://192.168.1.238:3001/comments/${existingComment.id}`, {
                comment: textArea
            })
            : axios.post(`http://192.168.1.238:3001/comments/${movieId}`, {
                nameuser: user,
                comment: textArea
            });

        request.then(() => {
            setTextArea('');
            reloadComments();
        }).catch((err) => console.log('Error al guardar comentario: ' + err));
    };

    useEffect(() => {
        const interval = setInterval(() => {
            const storedUser = localStorage.getItem('userActive');
            const name = storedUser ? JSON.parse(storedUser).name : '';
            setUser(name);
        }, 150);
    
        return () => clearInterval(interval);
    }, []);    

    useEffect(() => {
        reloadComments();
    }, [movieId]);

    return (
        <>
            <section className='text-3xl md:text-5xl max-w-xl px-6 mt-4 md:ps-20 pb-20 md:pb-0'>
                <h3 className="max-w-3xl text-2xl mb-4">Comentarios</h3>
                {user && (
                    <>
                        <Textarea
                            className="max-w-xs mb-2 md:mb-0 shadow-lg shadow-blue-700/30 rounded-xl dark:text-black/90"
                            label="Describe tu comentario"
                            placeholder="¿Qué opinas de la película?"
                            variant='faded'
                            value={textArea}
                            onValueChange={setTextArea}
                        />
                        <MyButton
                            text={data.some(item => item.nameuser === user) ? 'Actualizar' : 'Enviar'}
                            color='primary'
                            className='max-w-28'
                            onPress={handleTextArea}
                        />
                    </>
                )}
            </section>

            <section className='w-full px-6 mt-4 md:ps-20 flex flex-wrap gap-6'>
                {data.map((item, idx) => (
                    <section className='max-w-xs w-screen' key={idx}>
                        <User
                            name={item.nameuser}
                            description={item.nameuser === user ? 'usuario activo' : ''}
                        />
                        <Textarea
                            isReadOnly
                            className="max-w-xs mb-2 md:mb-0 shadow-lg shadow-blue-700/30 rounded-xl dark:text-black/90"
                            label={item.comment}
                            variant='faded'
                        />
                    </section>
                ))}
            </section>
        </>
    );
};
