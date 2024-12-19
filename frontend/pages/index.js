import Echo from 'laravel-echo';
import Pusher from 'pusher-js';

if (typeof window !== 'undefined') {
    window.Pusher = Pusher;
    const echo = new Echo({
        broadcaster: 'pusher',
        key: process.env.NEXT_PUBLIC_PUSHER_APP_KEY, 
        cluster: process.env.NEXT_PUBLIC_PUSHER_APP_CLUSTER,
        wsHost: process.env.NEXT_PUBLIC_LARAVEL_ECHO_HOST, 
        wsPort: process.env.NEXT_PUBLIC_LARAVEL_ECHO_PORT,
        disableStats: true,
    });

    echo.channel('chat')
        .listen('MessageSent', (event) => {
            console.log('Nova mensagem recebida:', event.message);
        });
}
