import Mapbox from '@/views/Mapbox'
import Grid from '@/views/Grid'
import Test from '@/views/Test'
import HeatMap from '@/views/HeatMap'
import HeatMapAQILevel from "./views/HeatMapAQILevel";
import GridAQILevel from "./views/GridAQILevel";
const routes = [
    {
        path: '/mapbox',
        component: Mapbox
    },
    {
        path: '/',
        component: GridAQILevel
    },
    {
        path: '/test',
        component: Test
    },{
        path: '/heatmap',
        component: HeatMap
    }
    ,{
        path: '/heatmapAQI',
        component: HeatMapAQILevel
    }
]

export default routes