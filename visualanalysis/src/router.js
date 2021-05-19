import Mapbox from '@/views/Mapbox'
import Grid from '@/views/Grid'
import Test from '@/views/Test'

const routes = [
    {
        path: '/mapbox',
        component: Mapbox
    },
    {
        path: '/',
        component: Grid
    },
    {
        path: '/test',
        component: Test
    }
]

export default routes