import Mapbox from '@/views/Mapbox'
import Grid from '@/views/Grid'
import Test from '@/views/Test'
import HeatMap from '@/views/HeatMap'

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
    },{
        path: '/heatmap',
        component: HeatMap
    }
]

export default routes