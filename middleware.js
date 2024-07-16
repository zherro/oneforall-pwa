import { updateSession } from '@supabase/utils/middleware'

export async function middleware(request) {
    
    // update user's auth session
    console.log('MIDDLEWARE DA RAIZ RODOU')
    const response =  await updateSession(request);
    response.headers.set('Vary', 'Accept-Encoding, Accept');
    return response;
}
