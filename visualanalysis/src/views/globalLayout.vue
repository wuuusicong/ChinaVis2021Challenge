<template>
    <div id="layoutContainer">
        <div class="left">
            <div class="leftLayout">
                <img :src="bg" alt=""  width="198" height="150" class="bg_pic">
                <img :src="logo" alt=""  width="150" height="120" z-index="2" class="logo_pic">
            </div>
            <div class="main-layout-nav" @click="changeLayout" data-name="grid">
                <img class="layout_logo" :src="grid" alt=""  width="120" height="130">
            </div>
            <div class="main-layout-nav" @click="changeLayout" data-name="tree">
                <img class="layout_logo" :src="tree" alt=""  width="120" height="125">
            </div>
            <div class="main-layout-nav" @click="changeLayout" data-name="calendar">
                <img class="layout_logo" :src="calendar" alt=""  width="115" height="130">
            </div>
            <div class="main-layout-nav" @click="changeLayout" data-name="t-sne">
                <img class="layout_logo" :src="t_sne" alt=""  width="120" height="130">
            </div>
            <div class="main-layout-nav" @click="changeLayout" data-name="bar">
                <img class="layout_logo" :src="bar" alt=""  width="110" height="125">
            </div>
        </div>
        <div class="main">
            <div class="status-control">
                <div class="status-control-first">
                    <div class="date">
                        <span class="control-category-title">Date：</span>
                        <DatePicker @dateChange="getStartDate"></DatePicker>
                        <span style="margin:0px 8px"> -- </span>
                        <DatePicker @dateChange="getEndDate"></DatePicker>
                    </div>
                    <div class="pollution-events">
                        <span class="control-category-title">Pollution Rating：</span>
                        <Rating @ratingChange="getRating"></Rating>
                    </div>
                    <div class="pollution-category">
                        <span class="control-category-title">Pollution Item：</span>
                        <ul class="pollution-list" @click="getPollutionItem">
                            <li class="pollution-item" data-item="pm2.5"><input id="pm2.5" type="radio" name="pollution-item" data-item="pm2.5"> <label for="pm2.5">pm2.5</label></li>
                            <li class="pollution-item" data-item="pm10"><input id="pm10" type="radio" name="pollution-item" data-item="pm10"> <label for="pm10">pm10</label></li>
                            <li class="pollution-item" data-item="CO2"><input id="CO2" type="radio" name="pollution-item" data-item="CO2"> <label for="CO2">CO2</label></li>
                            <li class="pollution-item" data-item="SO2"><input id="SO2" type="radio" name="pollution-item" data-item="SO2"> <label for="SO2">SO2</label></li>
                            <li class="pollution-item" data-item="O3"><input id="O3" type="radio" name="pollution-item" data-item="O3"> <label for="O3">O3</label></li>
                            <li class="pollution-item" data-item="NO2"><input id="NO2" type="radio" name="pollution-item" data-item="NO2"> <label for="NO2">NO2</label></li>
                        </ul>
                    </div>
                </div>
                <div class="status-control-second">
<!--                    <div class="item-slider">-->
<!--                        <span class="control-category-title">item-num：</span><v-slider v-model="value"></v-slider>    -->
<!--                    </div>-->
<!--                    <div class="item-slider">-->
<!--                        <span class="control-category-title">item-size：</span><v-slider v-model="value"></v-slider>-->
<!--                    </div>-->
                    <div class="btn-container">
                        <div class="containerItem">
                            <svg t="1623145164159" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="34797" width="40" height="40"><path d="M511.988744 960.243931c-247.155053 0-448.233698-201.079668-448.233698-448.255187 0-247.155053 201.079668-448.233698 448.233698-448.233698 247.175519 0 448.255187 201.079668 448.255187 448.233698C960.243931 759.165286 759.165286 960.243931 511.988744 960.243931zM511.988744 96.294137c-229.211379 0-415.69563 186.483228-415.69563 415.69563 0 229.232868 186.483228 415.716096 415.69563 415.716096 229.232868 0 415.716096-186.483228 415.716096-415.716096C927.705863 282.777365 741.222635 96.294137 511.988744 96.294137z" p-id="34798" fill="#e6e6e6"></path><path d="M475.277634 681.144328c-4.173043 0-8.325619-1.589195-11.502985-4.76656L332.750523 545.354666c-6.354731-6.354731-6.354731-16.650215 0-23.00597s16.650215-6.354731 23.00597 0L486.780619 653.371798c6.354731 6.354731 6.354731 16.650215 0 23.00597C483.60223 679.555134 479.450676 681.144328 475.277634 681.144328z" p-id="34799" fill="#e6e6e6"></path><path d="M475.277634 681.144328c-4.173043 0-8.325619-1.589195-11.502985-4.76656-6.354731-6.355755-6.354731-16.650215 0-23.00597l278.845823-278.845823c6.354731-6.354731 16.650215-6.354731 23.00597 0 6.354731 6.354731 6.354731 16.650215 0 23.00597L486.780619 676.377768C483.60223 679.555134 479.450676 681.144328 475.277634 681.144328z" p-id="34800" fill="#e6e6e6"></path></svg>
                            <span style="margin-left: 10px;font-size: 20px;color: gold;font-weight: bold">Item</span>
                        </div>

                        <!-- <button class="changeLayout" @click="calendar">calendar</button> -->
                        <!--            <button class="changeLayout" @click="t_sne">t_sne</button>            -->
<!--                        <button class="changeLayout" @click="itemRect">rect</button>-->
<!--                        <button class="changeLayout" @click="itemMap">Map</button>-->

                        <div class="itemInlineAll">
                            <div class="containerItemInline">
                                <svg id="pieChart" t="1623144615638" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="24637" width="30" height="30"><path d="M933.76 531.52H534.72a46.72 46.72 0 0 1-47.488-47.552V81.664c0-12.672 4.736-25.344 14.208-34.88 9.536-9.472 22.208-12.672 34.88-12.672a472.32 472.32 0 0 1 443.52 446.72c0 12.672-3.2 25.344-12.672 34.816-9.536 9.536-20.608 15.872-33.28 15.872zM582.272 436.48h297.728a380.8 380.8 0 0 0-297.728-300.992V436.48z" fill="#dbdbdb" p-id="24638"></path><path d="M507.712 981.312c-261.312 0-473.6-213.76-473.6-473.6A474.56 474.56 0 0 1 390.528 48.384a47.232 47.232 0 1 1 22.144 91.904 378.496 378.496 0 0 0-283.52 367.424c0 207.488 169.472 378.56 378.56 378.56a379.392 379.392 0 0 0 365.888-281.92 46.72 46.72 0 0 1 58.624-33.28 46.72 46.72 0 0 1 33.28 58.624c-53.888 205.888-242.368 351.616-457.792 351.616z" fill="#dbdbdb" p-id="24639"></path></svg>
                                <div class="Item_choice">Pie</div>
                            </div>
                            <div class="containerItemInline">
                                <svg t="1623144786665" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="26321" width="30" height="30"><path d="M141.074286 906.496h741.851428c89.581714 0 134.582857-44.562286 134.582857-132.845714V250.331429c0-88.283429-45.001143-132.845714-134.582857-132.845715H141.074286C51.931429 117.504 6.491429 161.645714 6.491429 250.331429V773.668571c0 88.704 45.44 132.845714 134.582857 132.845715z" p-id="26322" fill="#dbdbdb"></path></svg>
                                <div class="Item_choice">Rect</div>
                            </div>
                            <div class="containerItemInline">
                                <svg t="1623152217961" class="icon" viewBox="0 0 1397 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="60662" width="30" height="30"><path d="M1073.829679 695.804334s-21.138543-1.249159-29.369112 30.35456c-4.719045 12.949613-13.879543 30.632151 0 37.558042s15.79492 10.395777 15.794919 10.395778a68.564941 68.564941 0 0 0 13.574193-36.655873c-2.220727-14.823352 15.18422-29.993692 0-41.638628z m128.552324-531.281135a153.355067 153.355067 0 0 0 14.198773-74.838494c-6.939771-6.939771-44.553332 32.838998-60.972831 30.340681s4.719045-33.810566-37.280452-38.529611c-15.17034-1.582268-22.720811-2.206847-26.190697-2.498318-4.094465-9.146619-29.660583-67.912602-40.403349-70.119449a42.318726 42.318726 0 0 0-18.931696 0 32.797359 32.797359 0 0 0-30.34068-7.911339 70.174968 70.174968 0 0 0-38.529611 25.579997c-9.590764 12.630384 29.036003 3.469886 12.616505 22.110111s-16.08639 49.272376-39.77877 52.742262-19.889385-8.244448-19.889384-8.244448-16.08639 46.774059-10.395778 53.71383 24.663947-6.939771 25.899227 0c28.133833-18.654105 55.976196 17.654778 40.708698 24.650068a36.336643 36.336643 0 0 1-29.660582 0 129.648808 129.648808 0 0 0-23.98385 16.419499c-1.249159 3.469886-10.395777 30.632151-26.815276 15.17034l-18.931697 21.138544s-20.819314-3.456006-25.566117-9.479728-24.663947 21.138543-6.023722 31.589839c6.648301 7.89746-7.89746 12.949613-7.89746 12.949613a56.239907 56.239907 0 0 1-27.162265 21.138544c-16.433379 4.719045-39.792649-6.939771-50.243944 0s-32.838998 16.433379-31.589839 19.903264-41.999496-19.903264-54.962989-19.903264 0.971568-16.419499-63.193558-16.419499a154.854058 154.854058 0 0 1-34.088157-8.244449l-16.419499-31.589839-24.289199-23.37315-51.493104-15.17034 5.690613-22.096232 3.469885-21.152423a65.636357 65.636357 0 0 1-9.160498-19.889384c0-6.023722-14.198772-12.949613-16.419499-16.419499s-14.198772-15.17034-11.700454-23.359271a12.227877 12.227877 0 0 0-6.023722-12.949613C442.032897 67.213726 429.235958 87.450099 425.488482 87.450099s-22.110111 13.879543-20.819314 24.316959-35.059725 6.023722-39.77877-5.676733-26.856915 31.617598-24.705586 35.045845-32.838998 6.939771-37.558042 4.719044c-2.498318-1.582268-1.249159 6.315192-0.346989 14.837232a69.897377 69.897377 0 0 1 0.346989 18.043405c-2.220727 10.395777-17.391067 20.819314-17.391067 20.819314v12.963493a281.241173 281.241173 0 0 0-58.418995 11.700454c-2.498318 4.719045-9.493607-3.456006-22.443221 8.188931s-12.963493-13.879543-12.963492-13.879543-35.059725-4.719045-39.487299 5.676733-16.433379 28.133833 5.676733 39.778769c3.802995 18.931696-4.719045 24.608429-4.719045 24.608429s-7.550471-8.244448-8.522039 0 15.461811 20.819314 16.766487 25.579998a49.369533 49.369533 0 0 0 30.340681 41.083446 105.845392 105.845392 0 0 1-3.469886 21.138543c-1.859859 6.939771 21.152423 6.939771 18.931696 12.616505s-10.742766 2.498318-12.963493 0 10.409657 47.05165-1.249158 48.009338c-9.146619 0.971568-8.230569-6.634421-7.550472-10.104307a62.124833 62.124833 0 0 0-5.343624 19.570155c0 8.18893-4.441454 21.152423 12.949614 25.579997 7.27288 4.719045 6.023722 32.838998 26.829156 29.369112 11.367345-1.873738 11.700454-4.080586 10.742766-5.329744 0.333109 0.333109 0.624579 0.624579 0.957688 0.624579 8.244448 3.469886 15.461811 37.558042 25.913106 37.558043s13.879543 29.036003 32.852878 36.308883a11.339586 11.339586 0 0 1 2.845306 1.263039c16.419499 7.27288 23.692379 19.597914 39.15419 20.819314 16.419499 1.249159 12.949613 0 22.110112 14.212652s12.949613-22.4571 27.162265-14.212652 29.036003 7.564351 36.308883 17.391067a26.260095 26.260095 0 0 1 3.469886 21.138543 45.413864 45.413864 0 0 0 36.017413 6.023722l3.816874-0.971568c20.819314-5.676733 38.862719-21.471653 45.455503-21.471653a174.243779 174.243779 0 0 1 32.852877 10.742766c3.456006 0.957688 5.676733-17.682537 9.146619-15.184219s35.351195 45.469382 14.823351 68.204072c-19.875505 21.138543-55.518171 47.05165-10.728886 45.802491a33.491336 33.491336 0 0 0 5.399142-0.346988 39.76489 39.76489 0 0 1 5.329744 23.35927h9.785078l-9.785078 23.35927h13.241084l14.212652 21.138544 10.395777-6.023722 6.939771 14.198772h12.949614l-3.456006-32.838998 11.700454 4.719045s4.719045-11.714334 10.395778-11.714334 4.719045 10.395777 10.742766 10.395777a45.982925 45.982925 0 0 0 16.433378-6.939771 83.846317 83.846317 0 0 0 17.377188 4.719045c4.719045 0 10.742766-12.963493 18.931696-12.963493a73.464419 73.464419 0 0 1 26.815276 6.134758 131.439269 131.439269 0 0 0 25.579997 33.185986 24.788863 24.788863 0 0 0 22.443221 5.343624c28.133833-6.939771 16.08639-10.742766 25.566118 8.244448s11.714334 31.589839-2.206848 30.340681-34.102036 34.102036-11.714334 37.571922 35.059725-23.35927 44.220223-30.632151-11.714334-12.616504-11.714334-22.110111a49.494449 49.494449 0 0 0-5.676733-19.889385c-3.275572-6.148637 59.682034-10.395777 63.193558-18.640226a68.315109 68.315109 0 0 1 18.640226-18.917817 128.774397 128.774397 0 0 0 53.991421-3.469885 233.648221 233.648221 0 0 0 51.479224-43.248655 161.321925 161.321925 0 0 0 18.640225-53.699951v-6.023721a93.673034 93.673034 0 0 0 21.138544-18.640226 89.745123 89.745123 0 0 0 18.640226-36.308884v-25.621636a59.001936 59.001936 0 0 1-25.913106-7.28676 8.980064 8.980064 0 0 1 1.873738-1.596147c11.991925-9.479728 31.603719-3.802995 17.044078-18.293237-15.447931-15.17034 3.469886-12.602625 3.469886-12.602625s-34.157555-68.204073-51.479224-70.424799 43.234775-64.095728 43.234776-72.340177c0-4.163863-20.513964-6.648301-41.638628-8.522039-22.734691-2.206847-46.093961-3.178415-46.093962-3.178415L953.494044 368.996622l-3.816874-6.66218a86.275237 86.275237 0 0 0 39.778769-25.274648c0.971568-0.971568 1.596147-1.887618 2.498318-2.845306 18.043405-21.485532 48.647797-46.774059 36.947343 4.094465-0.360868 1.387954-0.693977 2.706511-0.971568 4.080586-13.879543 56.212148 12.949613-13.879543 48.023217-16.419499a27.92564 27.92564 0 0 1 2.498318-4.080586 40.66706 40.66706 0 0 1 20.819314-20.236373 6.67606 6.67606 0 0 0 3.192295-1.873738 44.719886 44.719886 0 0 0 12.283395-24.011609h29.063762l-9.146618-12.963493s26.829156-11.700454 27.759085-32.505889c11.991925 5.690612 11.991925 5.690612 19.889385-8.230569a35.073604 35.073604 0 0 0 0-37.571922c-5.551817-5.787769 15.642245-20.000421 20.069818-20.000421z m0 0" fill="#dbdbdb" p-id="60663"></path><path d="M803.164717 626.71197a9.535246 9.535246 0 0 1-8.757991-5.690612A167.345646 167.345646 0 0 0 632.737813 512.025309a9.493607 9.493607 0 0 1 0-18.917816 185.305774 185.305774 0 0 1 179.0461 120.640985 9.340932 9.340932 0 0 1-5.052153 12.325034 8.577557 8.577557 0 0 1-3.580922 0.638458z m0 0" fill="#dbdbdb" p-id="60664"></path><path d="M633.306874 512.080828a9.327053 9.327053 0 0 1-6.079239-2.206848 9.41033 9.41033 0 0 1-1.138123-13.296602 191.912437 191.912437 0 0 0 39.778769-176.173035 9.493607 9.493607 0 0 1 18.043406-5.676733 211.191121 211.191121 0 0 1-43.165378 194.216441 9.465848 9.465848 0 0 1-7.439435 3.122897z m0 0" fill="#dbdbdb" p-id="60665"></path><path d="M628.421275 507.819808a9.368691 9.368691 0 0 1-6.315192-2.387281c-78.585971-69.49487-133.410164-85.58126-265.945917-78.530453a9.618523 9.618523 0 0 1-10.00715-8.980064 9.493607 9.493607 0 0 1 8.980064-9.951632c138.545595-7.383917 196.284493 9.71568 279.533989 83.277256a9.479728 9.479728 0 0 1-6.301312 16.530535z m0 0" fill="#dbdbdb" p-id="60666"></path><path d="M645.742944 731.016734h-0.90217a9.424209 9.424209 0 0 1-8.577557-10.284741 639.846917 639.846917 0 0 0-87.066371-398.20408 9.493607 9.493607 0 0 1 16.030871-10.104307 659.125602 659.125602 0 0 1 89.84228 409.987811 9.507487 9.507487 0 0 1-9.327053 8.577558z m0 0" fill="#dbdbdb" p-id="60667"></path><path d="M708.99202 677.677651a8.452641 8.452641 0 0 1-8.910666-7.217362v-1.81822c-9.493607-64.206764-20.291891-137.004966-71.035499-161.904865a149.899061 149.899061 0 0 1-52.742263-56.253787A171.676063 171.676063 0 0 0 435.828741 356.713227a9.493607 9.493607 0 0 1-8.591437-10.284741 9.0911 9.0911 0 0 1 10.298621-8.577558 189.747228 189.747228 0 0 1 154.451551 102.29223 135.214505 135.214505 0 0 0 45.469381 49.785919c59.682034 29.258076 71.257572 107.288865 81.431277 176.159156a10.298621 10.298621 0 0 1-7.841941 11.714334z m0 0" fill="#dbdbdb" p-id="60668"></path><path d="M632.959886 511.622803a9.368691 9.368691 0 0 1-8.52204-5.676733 9.493607 9.493607 0 0 1 4.427575-12.616505 298.132577 298.132577 0 0 1 28.994364-11.367345 132.521873 132.521873 0 0 0 96.601617-75.810062 9.493607 9.493607 0 0 1 18.043406 5.690612 149.60759 149.60759 0 0 1-108.260433 87.801987 283.253707 283.253707 0 0 0-27.106747 10.395778 9.146619 9.146619 0 0 1-4.163863 1.582268z m0 0" fill="#dbdbdb" p-id="60669"></path><path d="M590.918751 500.616325a44.844802 44.844802 0 1 0 44.830923-44.830923 44.844802 44.844802 0 0 0-44.830923 44.830923z m0 0" fill="#dbdbdb" p-id="60670"></path></svg>
                                <div class="Item_choice">Map</div>
                            </div>
                        </div>

                    </div>
                    </div>
                <div class="status-control-forth">
                    <ul class="event-list">
                        <div class="event-category">
                            Season:
                        </div>
                        <li class="event-item" data-item="Spring"><input v-model="eventList.spring" id="Spring" type="checkbox" name="event-item" data-item="Spring"> <label for="Spring">Spring</label></li>
                        <li class="event-item" data-item="Summer"><input v-model="eventList.summer" id="Summer" type="checkbox" name="event-item" data-item="Summer"> <label for="Summer">Summer</label></li>
                        <li class="event-item" data-item="Autumn"><input v-model="eventList.autumn" id="Autumn" type="checkbox" name="event-item" data-item="Autumn"> <label for="Autumn">Autumn</label></li>
                        <li class="event-item" data-item="Winter"><input v-model="eventList.winter" id="Winter" type="checkbox" name="event-item" data-item="Winter"> <label for="Winter">Winter</label></li>
                    </ul>
                    <ul class="event-list">
                        <div class="event-category">
                            Event:
                        </div>
                        <li class="event-item" data-item="SF"><input v-model="eventList.SF" id="SF" type="checkbox" name="event-item" data-item="SF"> <label for="SF">Spring Festival</label></li>
                        <li class="event-item" data-item="NPC"><input v-model="eventList.NPC" id="NPC" type="checkbox" name="event-item" data-item="NPC"> <label for="NPC">NPC</label></li>                        
                    </ul>
                </div>
                <div class="status-control-third">
                    <svg id="controlMap"></svg>
                </div>
            </div>
            <div class="layout">
                <GridAQILevel ref="layout" :eventList="eventList" :layoutCategory="layoutCategory" :pic="pic"></GridAQILevel>
            </div>
        </div>
        <div class="right">
           <Report :dateRange="DateRange" :pollution_item="Pollution_Item" :province_name="province"></Report>
        </div>
        <div id="tooltip" style="opacity: 0;position: absolute"></div>
    </div>
    <!-- <div id="demo"></div> -->
</template>

<script>
    // import SmallMultiples from "@/components/sicong/SmallMultiples_Canvas";
    import bg from "@/assets/icon/bg.png"
    import logo from "@/assets/icon/logo.png"
    import grid from "@/assets/icon/grid.png"
    import tree from "@/assets/icon/tree.png"
    import t_sne from "@/assets/icon/t-sne.png"
    import calendar from "@/assets/icon/calendar.png"
    import bar from "@/assets/icon/bar.png"
    import GridAQILevel from "./GridAQILevel";
    import DatePicker from '@/components/DatePicker'
    import Rating from '@/components/Rating'
    import Report from '@/components/Report'
    import map_Data from '@/assets/map/china.json'
    import * as d3 from "d3";
    import $ from "jquery"
    export default {
        components: {
            GridAQILevel,
            DatePicker,
            Rating,
            Report
        },
        data() {
            return {
                bg,
                logo,
                tree,
                grid,
                t_sne,
                calendar,
                bar,
                renderCanvas: false,
                value: 0,
                layoutCategory: 'init',
                province:' ',
                DateRange: {
                    StartDate: '2013-01',
                    EndDate: '2019-01'
                },
                Pollution_Item: ' ',
                pic:this.$store.state.pic.Hebei,
                eventList: {
                    SF: '',
                    NPC: '',
                    spring: '',
                    summer: '',
                    autumn: '',
                    winter: ''
                }
            }
        },
        methods: {
            changeLayout(e){
                let category = e.currentTarget.dataset['name'];
                console.log(category)
                this.layoutCategory = category;
            },
            itemPiechart(){
              this.$refs.layout.itemPieChart()
            },
            getStartDate(date){
                console.log(date)
                setTimeout(() =>{
                    this.DateRange.StartDate = date;
                },250);
            },
            getEndDate(date){
                console.log(date)
                setTimeout(() =>{
                    this.DateRange.EndDate = date;
                },250);
            },
            getRating(rating){
                console.log(rating)
            },
            getPollutionItem(e){
                if (e.target.tagName === 'LABEL') {return;}
                let item = e.target.dataset['item']
                console.log(item)                   
            },
            // eventChange(e){

            //     if (e.target.tagName === 'LABEL') {return;}
            //     let item = e.target.dataset['item']
            //     switch (item) {
            //         case 'SF':this.$refs.layout.springFestival("SF","eventHoliday");break;
            //         case 'NPC':this.$refs.layout.springFestival("NPC","eventHoliday");break;
            //         case 'Spring':this.$refs.layout.springFestival("spring","eventSeason");break;
            //         case 'Summer':this.$refs.layout.springFestival("summer","eventSeason");break;
            //         case 'Autumn':this.$refs.layout.springFestival("autumn","eventSeason");break;
            //         case 'Winter':this.$refs.layout.springFestival("winter","eventSeason");break;
            //         default: break ;
            //     }
            //     setTimeout(() =>{
            //         this.Pollution_Item = item;
            //     },250);
            // },
            drawControlMap(){
                console.log("controlMap")
                let that = this;
                let lengthSvg = [200,150]
                let controlSvg = d3.select("#controlMap")
                                    .attr("width",lengthSvg[0])
                                    .attr("height",lengthSvg[1])

                // let mapG = svg.append('g')
                    // .attr("transform", `translate(${x},${y})`);

                let projection = d3.geoMercator()
                    .fitSize(lengthSvg,map_Data);

                const path = d3.geoPath().projection(projection)

                let province = controlSvg.selectAll('.gMap')
                    .data(map_Data.features)
                    .enter()
                    .append("g")
                    .append('path')
                    .attr('d', path)
                    .attr('fill', '#272823')
                    .attr("stroke","white")
                    .attr('stroke-width', 1)
                    .attr('opacity', 0.6);
                province.on("mousemove",function(d,i){
                        // console.log( d3.select(this))
                        // d3.select(this)
                        //     .attr("fill", "yellow");
                        // console.log(i)
                        $("#tooltip>*").remove();
                        var x = d.pageX;
                        var y = d.pageY + 30;
                        $("#tooltip").text(i.properties.name);

                        $("#tooltip") .css("left",x+"px")
                            .css("top",y+"px")
                            .css("opacity",1.0);
                    })
                    .on("mouseout", function(d, i) {
                        // var t = linear(values[d.properties.name]);
                        // var color = computeColor(t).toString();
                        // d3.select(this)
                        //     .attr("fill", '#272823');
                        $("#tooltip").css("opacity",0.0);
                    })
                    .on("click",function (d,i) {
                        province.attr("fill","#272823")
                        d3.select(this)
                            .attr("fill", 'yellow');
                        that.province = i.properties.name
                        console.log(that.province)
                    });
                // controlSvg.selectAll(".text")
                //     .data(map_Data.features)
                //     .enter()
                //     .append("text")
                //     .text(function(d, i) {
                //         return d.properties.name.replace("省","")
                //     })
                //     .attr("fill", "black")
                //     .attr("x", function(d) {
                //         d.properties.name = d.properties.name.replace("省","")
                //         if(d.properties.name == '河北') {
                //             return path.centroid(d)[0] - 10;
                //         } else if(d.properties.name == '天津') {
                //             return path.centroid(d)[0] + 5;
                //         } else if(d.properties.name == '香港') {
                //             return path.centroid(d)[0] + 10;
                //         } else if(d.properties.name == '澳门') {
                //             return path.centroid(d)[0] - 10;
                //         } else if(d.properties.name == '甘肃') {
                //             return path.centroid(d)[0] + 35;
                //         } else if(d.properties.name == '陕西') {
                //             return path.centroid(d)[0] + 3;
                //         } else if(d.properties.name == '内蒙古') {
                //             return path.centroid(d)[0] + 20;
                //         } else {
                //             return path.centroid(d)[0]-5;
                //         }
                //     })
                //     .attr("y", function(d) {
                //         if(d.properties.name == '河北') {
                //             return path.centroid(d)[1] + 20;
                //         } else if(d.properties.name == '天津') {
                //             return path.centroid(d)[1] + 5;
                //         } else if(d.properties.name == '香港') {
                //             return path.centroid(d)[1] + 10;
                //         } else if(d.properties.name == '澳门') {
                //             return path.centroid(d)[1] + 13;
                //         } else if(d.properties.name == '甘肃') {
                //             return path.centroid(d)[1] + 30;
                //         } else if(d.properties.name == '陕西') {
                //             return path.centroid(d)[1] + 10;
                //         } else if(d.properties.name == '内蒙古') {
                //             return path.centroid(d)[1] + 10;
                //         } else {
                //             return path.centroid(d)[1];
                //         }
                //     })
                //     .style("font-size", "3px")
            },

        },
        mounted() {            
            this.drawControlMap()
        },
        computed: {
            computedDateFormatted() {
                return this.formatDate(this.date)
            },
        },        
    };
</script>

<style scoped>
    html,
    body {
        padding: 0;
        margin: 0;
        width: 100%;
        height: 100%;
        overflow-y: hidden;
    }

    .main-layout-nav{
        background: url("../assets/icon/bg.png") no-repeat;
        text-align: center;
        /*margin: 30px 0px;*/
        /*margin-bottom: 30px;*/
        height: 170px;
    }

    .main-layout-nav:hover{
        border-color: #999;
    }

    #layoutContainer {
        width: 100%;
        height: 100%;
        background: #1f1f1f;
    }

    .left {
        float: left;
        width: 199px;
        height: 100%;
        border-right: 1px solid #ddd;
        /*background-color: rgb(250, 250, 250);*/
        background: #1f1f1f;
    }

    .right {
        position: relative;
        float: left;
        width: 249px;
        height: 100%;
        border-left: 1px solid #ddd;
    }

    .main {
        float: left;
        width: calc(100% - 450px);
        height: 100%;
        position: relative;
    }

    .control-category-title {
        display: inline-block;
        text-align: center;
        width: 145px;
        color:gold;
        font-weight: bold;
    }

    .status-control {
        height: 15vh;
        border-bottom: 1px solid #ddd;
        /*background-color: rgb(250, 250, 250);*/
        background-color: #1f1f1f;
    }

    .status-control-first {
        padding-right: 30px;
        float: left;
    }

    .status-control-second {
        box-sizing: border-box;
        border-left: 1px solid #ddd;
        width: 300px;
        height: 150px;
        padding-left: 30px;
        padding-top: 10px;
        float: left;
    }


    .status-control .date,
    .status-control .pollution-events,
    .pollution-category{
        display: flex;
        align-items: center;
        justify-content: flex-start;
        height: 50px;
    }

    .item-slider {
        display: flex;
        
    }

    .pollution-list {
        display: flex;
        align-items: center;
        justify-content: flex-start;
        list-style: none;
        padding-left: 0px;
        height: 50px;
    }

    .pollution-item {
        padding: 0px 8px;
        color: #FFE699;
    }

    .status-control-third{
        /*height: 100%;*/
        box-sizing: border-box;
        border-left: 1px solid #ddd;
        width: 300px;
        height: 100%;
        padding-left: 10px;
        /*padding-top: 10px;*/
        float: left;
    }
    .status-control-forth{
        /*height: 100%;*/
        box-sizing: border-box;
        border-left: 1px solid #ddd;
        width: 300px;
        height: 100%;
        padding-left: 10px;
        /*padding-top: 10px;*/
        float: left;
    }

    .layout {
        height: 84vh;
        position: relative;
    }
    .changeLayout {
        display: inline-block;
        width: 70px;
        height: 30px;
        border: 1px solid #aaa;
        border-radius: 4px;
        /* padding: 3px 3px; */
        margin: 0px 5px;
    }
    .node2Text{
        font-size: 10px;
    }
    .leftLayout{
        height: 150px;
        font-size: 20px;
        font-family: "Helvetica Neue", Helvetica, Arial, sans-serif;
        text-align: center;
        display: block;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        /*line-height:50px;*/
        position:relative;
    }
    .bg_pic{
        position:relative;
    }
    .logo_pic{
        position:absolute;
        top: 20px;
        left: 30px;
    }
    .layout_logo{
        z-index: 2;
        margin-top: 20px;
    }
    .containerItem{
        display: flex;
        flex-direction: row;
        justify-content: center;
        align-items: center;
        margin-right: 10px;
    }
    .containerItemInline{
        display: inline-block;
    }
    .itemInlineAll{
        margin-top: 20px;
        display: flex;
        flex-direction: row;
        justify-content: space-between;

        width: 80%;
    }
    #controlMap{
        margin-left: 50px;
    }

    .event-list{
        margin-top: 8px;
        padding: 0px 20px;
        float: left;
        list-style: none;
    }
    .event-category{
        color: gold;
        font-weight: bold;
        font-size: 20px;
    }
    .event-item{
        color: #FFE699;
    }
    .Item_choice{
        color: #FFE699;
    }

</style>