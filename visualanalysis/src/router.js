import Mapbox from '@/views/Mapbox'
import Grid from '@/views/Grid'
import Test from '@/views/Test'
import HeatMap from '@/views/HeatMap'
import HeatMapAQILevel from "./views/HeatMapAQILevel";
import GridAQILevel from "./views/GridAQILevel";
import globalLayout from "./views/globalLayout";
const routes = [
    {
        path: '/mapbox',
        component: Mapbox
    },
    {
        path: '/GridAQI',
        component: GridAQILevel
    },
    {
        path: '/',
        component: globalLayout
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