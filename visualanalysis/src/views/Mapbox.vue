<template>
    <div>
        <div id="map"></div>
        <button @click="handleClick">click</button>
        <!-- <div id="demo"></div> -->
    </div>

</template>

<script>
    // import createPilingJs, {
    // 	createImageRenderer
    // } from 'piling.js';
    export default {
        data() {
            return {
                map: ''
            };
        },
        components: {},
        created() {},
        mounted() {
            // const items = [{
            // 	src: 'http://example.com/my-fancy-photo.png'
            // }];

            // // instantiate a matching the data type of your items
            // const itemRenderer = createImageRenderer();

            // const piling = createPilingJs(
            // 	document.getElementById('demo'), // dom element in which piling.js will be rendered
            // 	{
            // 		// Mandatory: add the items and corresponding renderer
            // 		items,
            // 		itemRenderer,
            // 		// Optional: configure the view specification
            // 		columns: 4
            // 	}
            // );
            // console.log(piling)
            this.initmap();
        },
        computed: {},
        methods: {
            initmap() {
                this.$mapboxgl.accessToken =
					"pk.eyJ1IjoibGlqaWFuZ2ppYW5namlhbmciLCJhIjoiY2s2b2czbmltMG14cDNkbXpldjhkd3c3ZiJ9.zBaMzJo2X2UVPyFTtd5hEQ";

                var mapboxgl = this.$mapboxgl;
                var map = new mapboxgl.Map({
                    container: 'map',
                    style: 'mapbox://styles/mapbox/dark-v10',
                    center: [12.550343, 55.665957],
                    zoom: 8
                });
                this.map = map
                // Create a default Marker and add it to the map.
                var marker1 = new mapboxgl.Marker()
                    .setLngLat([12.554729, 55.70651])
                    .addTo(map);

                // Create a default Marker, colored black, rotated 45 degrees.
                var marker2 = new mapboxgl.Marker({
                    color: 'black',
                    rotation: 45
                })
                    .setLngLat([12.65147, 55.608166])
                    .addTo(map);

                console.log(marker1, marker2)
            },
            handleClick() {
                this.map.setStyle("mapbox://styles/mapbox/streets-v11");
                console.log(this.map)
            }
        }
    };
</script>

<style>
    #map {
        height: 500px;
        border: 1px solid red;
    }
</style>