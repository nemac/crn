function generate_mugl(stidx) {
    var oneDay = window.multigraph.core.DatetimeMeasure.parse("1D");
    var minusOneDay = window.multigraph.core.DatetimeMeasure.parse("-1D");
    var t = (new Date()).getTime();
    var today = new window.multigraph.core.DatetimeValue(t);
    var maxDate = today.add(oneDay);
    var minDate = today.add(minusOneDay);
    var f = new window.multigraph.core.DatetimeFormatter("%Y%M%D");

    return {
        "legend": {
            "base": [0,1],
            "anchor": [0,1],
            "position": [0,5],
            "border": 0,
            "rows": 1,
            "frame": "padding",
            "icon": {
                "width": 15,
                "height": 15,
                "border": 0
            }
        },
        "window": {
            "margin": 2,
            "border": 2,
            "padding": 5
        },
        "plotarea": {
            "marginbottom": 40,
            "marginleft": 60,
            "marginright": 170,
            "margintop": 25
        },
        "horizontalaxis": {
            "id": "time",
            "position": [0,0],
            "pregap": 0,
            "postgap": 0,
            "type": "datetime",
            "min": f.format(minDate),
            "max": f.format(maxDate),
            "title": "",
            "labels": {
                "format": "%h:%i%L%d %n%L%Y",
                "start": "0",
                "angle": 0,
                "anchor": [0,1],
                "spacing": ["2M","1M","7D","5D","2D","24H","12H","6H","3H","2H","1H","30m","1m"]
            },
            "binding": {
                "id": "timebinding",
                "min": "2009011116",
                "max": "2009011216"
            },
            "grid": {}
        },
        "throttle": {
            "pattern": "^http://data.multigraph.org",
            "requests": "1",
            "period": "1000",
            "concurrent": "1"
        },
        "data": [
            {
                "variables": [
                    {
                        "id": "time_1h",
                        "column": 0,
                        "type": "datetime"
                    },
                    {
                        "id": "solarad",
                        "column": 1,
                        "type": "number",
                        "missingvalue": -9999,
                        "missingop": "le"
                    },
                    {
                        "id": "sur_temp",
                        "column": 2,
                        "type": "number",
                        "missingvalue": -9999,
                        "missingop": "le"
                    },
                    {
                        "id": "windspd",
                        "column": 3,
                        "type": "number",
                        "missingvalue": -9999,
                        "missingop": "le"
                    }
                ],
                "service": {
                    "location": "http://data.multigraph.org/crn/" + stidx + "/SOLARAD,SUR_TEMP,WINDSPD/"
                }
            },
            {
                "variables": [
                    {
                        "column": 0,
                        "id": "time_5m",
                        "type": "datetime"
                    },
                    {
                        "column": 1,
                        "id": "temp",
                        "missingvalue": -9999,
                        "missingop": "le"
                    },
                    {
                        "column": 2,
                        "id": "precip",
                        "missingvalue": -9999,
                        "missingop": "le"
                    }
                ],
                "service": {
                    "location": "http://data.multigraph.org/crn/" + stidx + "/T5,P5/"
                }
            }
        ],
        "plots": [
            {
                "legend": {
                    "label": "Solar Radiation"
                },
                "horizontalaxis": {
                    "time": "time_1h"
                },
                "verticalaxis": {
                    "solarad": "solarad"
                },
                "renderer": {
                    "type": "fill",
                    "options": {
                        "linecolor": "#990000",
                        "fillcolor": "#ffaaaa"
                    }
                }
            },
            {
                "legend": {
                    "label": "Precip"
                },
                "horizontalaxis": {
                    "time": "time_5m"
                },
                "verticalaxis": {
                    "precip": "precip"
                },
                "renderer": {
                    "type": "bar",
                    "options": {
                        "fillcolor": "green",
                        "barwidth": "5m",
                        "baroffset": "0",
                        "linecolor": "black"
                    }
                }
            },
            {
                "legend": {
                    "label": "Air Temp"
                },
                "horizontalaxis": {
                    "time": "time_5m"
                },
                "verticalaxis": {
                    "temp": "temp"
                },
                "renderer": {
                    "type": "pointline",
                    "options": {
                        "linecolor": "blue",
                        "linewidth": "1",
                        "pointcolor": "blue",
                        "pointsize": "1",
                        "pointoutlinecolor": "blue"
                    }
                }
            },
            {
                "legend": {
                    "label": "Wind Speed"
                },
                "horizontalaxis": {
                    "time": "time_1h"
                },
                "verticalaxis": {
                    "windspd": "windspd"
                },
                "renderer": {
                    "type": "pointline",
                    "options": {
                        "linecolor": "black",
                        "linewidth": "1",
                        "pointcolor": "black",
                        "pointsize": "1",
                        "pointoutlinecolor": "black"
                    }
                }
            }
        ],
        "verticalaxes": [
            {
                "id": "temp",
                "position": [0,0],
                "base": [-1,-1],
                "pregap": 0,
                "postgap": 0,
                "type": "number",
                "min": 0,
                "max": 20.5,
                "title": {
                    "text": "Temperature (C)",
                    "angle": 90,
                    "position": [-45,0],
                    "anchor": [0,-1]
                },
                "labels": {
                    "format": "%.1f",
                    "start": 0,
                    "angle": 0,
                    "position": [-10,0],
                    "anchor": [1,0],
                    "spacing": [50,20,10,5,2,1,0.1,0.01]
                },
                "binding": {
                    "id": "tempbinding",
                    "min": 0,
                    "max": 1
                }
            },
            {
                "id": "precip",
                "position": [0,0],
                "base": [1,-1],
                "pregap": 0,
                "postgap": 0,
                "type": "number",
                "min": 0,
                "max": 10.1,
                "title": {
                    "text": "Precip (mm)",
                    "angle": 90,
                    "position": [25,0],
                    "anchor": [0,1]
                },
                "labels": {
                    "format": "%.1f",
                    "start": 0,
                    "angle": 0,
                    "position": [5,0],
                    "anchor": [-1,0],
                    "spacing": [50,20,10,5,2,1,0.1,0.01]
                },
                "zoom": {
                    "anchor": 0
                },
                "pan": false,
                "binding": {
                    "id": "precipbinding",
                    "min": 0,
                    "max": 1
                }
            },
            {
                "id": "solarad",
                "position": [60,0],
                "base": [1,-1],
                "pregap": 0,
                "postgap": 0,
                "type": "number",
                "min": 0,
                "max": 1100,
                "title": {
                    "text": "Solar Radiation (W/m^2)",
                    "angle": 90,
                    "position": [35,0],
                    "anchor": [0,1]
                },
                "labels": {
                    "format": "%1d",
                    "start": 0,
                    "angle": 0,
                    "position": [5,0],
                    "anchor": [-1,0],
                    "spacing": [1000,500,200,50,20,10,5,2,1,0.1,0.01]
                },
                "zoom": {
                    "anchor": 0
                },
                "pan": false,
                "binding": {
                    "id": "solaradbinding",
                    "min": 0,
                    "max": 1
                }
            },
            {
                "id": "windspd",
                "position": [120,0],
                "base": [1,-1],
                "pregap": 0,
                "postgap": 0,
                "type": "number",
                "min": 0,
                "max": 15,
                "title": {
                    "text": "Wind (m/s)",
                    "angle": 90,
                    "position": [35,0],
                    "anchor": [0,1]
                },
                "labels": {
                    "format": "%.1f",
                    "start": 0,
                    "angle": 0,
                    "position": [5,0],
                    "anchor": [-1,0],
                    "spacing": [1000,500,200,50,20,10,5,2,1,0.1,0.01]
                },
                "zoom": {
                    "anchor": 0
                },
                "pan": false,
                "binding": {
                    "id": "windspdbinding",
                    "min": 0,
                    "max": 1
                }
            }
        ]
    };
}


var stations = [
    { stidx: 1007, slv: "AK Barrow 4 ENE", name: "Barrow Obsv., NOAA Earth Systems Res. Lab., Global Mon. Div.", lat: 71.32, lng: -156.61 },
    { stidx: 1008, slv: "AK Fairbanks 11 NE", name: "NOAA / NESDIS (FCDAS)", lat: 64.97, lng: -147.51 },
    { stidx: 1143, slv: "AK St. Paul 4 NE", name: "NOAA National Weather Service St Paul", lat: 57.15, lng: -170.21 },
    { stidx: 1166, slv: "AK Sitka 1 NE", name: "USGS  Sitka Magnetic Observatory", lat: 57.05, lng: -135.32 },
    { stidx: 1670, slv: "AK Sand Point 1 ENE", name: "USGS Shumagin Magnetic Observatory", lat: 55.34, lng: -160.46 },
    { stidx: 1691, slv: "AK Port Alsworth 1 SW", name: "Lake Clark National Park", lat: 60.19, lng: -154.31 },
    { stidx: 1753, slv: "AK Kenai 29 ENE", name: "Kenai National Wildlife Refuge (Kenai Moose Research Center)", lat: 60.72, lng: -150.44 },
    { stidx: 1754, slv: "AK Red Dog Mine 3 SSW", name: "NANA Regional Corp Red Dog Mine", lat: 68.02, lng: -162.92 },
    { stidx: 1779, slv: "AK Tok 70 SE", name: "FWS, Tetlin National Wildlife Refuge (Seaton Roadhouse site)", lat: 62.73, lng: -141.2 },
    { stidx: 1780, slv: "AK Gustavus 2 NE", name: "The Nature Conservancy, Gustavus Forelands Preserve", lat: 58.42, lng: -135.69 },
    { stidx: 1787, slv: "AK Metlakatla 6 S", name: "NOAA, National Weather Service (Annette Island)", lat: 55.04, lng: -131.58 },
    { stidx: 1788, slv: "AK King Salmon 42 SE", name: "NPS, Katmai National Park (Contact Creek)", lat: 58.2, lng: -155.92 },
    { stidx: 1790, slv: "AK Glennallen 64 N", name: "BLM, Paxson Airport", lat: 63.02, lng: -145.5 },
    { stidx: 1791, slv: "AK Ivotuk 1 NNE", name: "Arctic Slope Regional Corporation, Ivotuk Airstrip", lat: 68.48, lng: -155.75 },
    { stidx: 1792, slv: "AK Ruby 44 ESE", name: "FWS, Nowitna National Wildlife Refuge (Lake Site)", lat: 64.5, lng: -154.12 },
    { stidx: 1793, slv: "AK Deadhorse 3 S", name: "AK Department of Natural Resources, Haul Road)", lat: 70.16, lng: -148.46 },
    { stidx: 1119, slv: "AL Gadsden 19 N", name: "Sand Mountain Research / Extension  (Northwest Pasture)", lat: 34.28, lng: -85.96 },
    { stidx: 1122, slv: "AL Selma 13 WNW", name: "Auburn University, Black Belt Research and Extension Center", lat: 32.45, lng: -87.24 },
    { stidx: 1124, slv: "AL Fairhope 3 NE", name: "Auburn University, Gulf Coast Research and Extension Center", lat: 30.54, lng: -87.87 },
    { stidx: 1129, slv: "AR Batesville 8 WNW", name: "LFST Br. Exp. Stn.,Univ.of AR, Div.of Agriculture(Field #1)", lat: 35.82, lng: -91.78 },
    { stidx: 1010, slv: "AZ Elgin 5 S", name: "Audubon (Appleton-Whittell Research Ranch)", lat: 31.59, lng: -110.5 },
    { stidx: 1011, slv: "AZ Tucson 11 W", name: "Sonora Desert Museum", lat: 32.23, lng: -111.16 },
    { stidx: 1590, slv: "AZ Yuma 27 ENE", name: "U.S. Army, Yuma Proving Ground  (Redbluff Pavement Site)", lat: 32.83, lng: -114.18 },
    { stidx: 1613, slv: "AZ Williams 35 NNW", name: "Babbitt Ranches (Meridian Site)", lat: 35.75, lng: -112.33 },
    { stidx: 1015, slv: "CA Redding 12 WNW", name: "Whiskeytown National Recreation Area (RAWS Site)", lat: 40.65, lng: -122.6 },
    { stidx: 1050, slv: "CA Merced 23 WSW", name: "Kesterson Reservoir (US Bureau of Reclamation)", lat: 37.23, lng: -120.88 },
    { stidx: 1105, slv: "CA Stovepipe Wells 1 SW", name: "Death Valley National Park (Stovepipe Wells Site)", lat: 36.6, lng: -117.14 },
    { stidx: 1508, slv: "CA Yosemite Village 12 W", name: "Yosemite National Park, (Crane Flat Lookout)", lat: 37.75, lng: -119.82 },
    { stidx: 1528, slv: "CA Fallbrook 5 NE", name: "San Diego State Univ's Santa Margarita Ecological Reserve (Old Mine Road)", lat: 33.43, lng: -117.19 },
    { stidx: 1529, slv: "CA Santa Barbara 11 W", name: "Univ. of California - Santa Barbara (Coal Oil Point Reserve)", lat: 34.41, lng: -119.87 },
    { stidx: 1531, slv: "CA Bodega 6 WSW", name: "University of California - Davis (Bodega Marine Laboratory)", lat: 38.32, lng: -123.07 },
    { stidx: 1014, slv: "CO Nunn 7 NNE", name: "Ag. Res. Svc. Central Plains Exp. Range (SGS LTER at CSU)", lat: 40.8, lng: -104.75 },
    { stidx: 1045, slv: "CO Boulder 14 W", name: "Mountain Research Station INSTAAR Univ. of CO (Hills Mill)", lat: 40.03, lng: -105.54 },
    { stidx: 1108, slv: "CO Dinosaur 2 E", name: "Dinosaur National Monument (Hdq. Maintenance Site)", lat: 40.24, lng: -108.96 },
    { stidx: 1109, slv: "CO Montrose 11 ENE", name: "Black Canyon of the Gunnison National Park (Vernal Mesa)", lat: 38.54, lng: -107.69 },
    { stidx: 1110, slv: "CO La Junta 17 WSW", name: "USDA Comanche National Grassland", lat: 37.86, lng: -103.82 },
    { stidx: 1232, slv: "CO Cortez 8 SE", name: "Mesa Verde National Park (Far View Site)", lat: 37.25, lng: -108.5 },
    { stidx: 1128, slv: "FL Everglades City 5 NE", name: "Big Cypress National Preserve (Ochopee Headquarters Vista Site)", lat: 25.89, lng: -81.31 },
    { stidx: 1141, slv: "FL Titusville 7 E", name: "NASA Kennedy Space Center, SLF Mid-Field Site", lat: 28.61, lng: -80.69 },
    { stidx: 1530, slv: "FL Sebring 23 SSE", name: "Archbold Biological Station", lat: 27.15, lng: -81.36 },
    { stidx: 1032, slv: "GA Newton 8 W", name: "Robert W. Woodruff Foundation (Ichauway-George Site)", lat: 31.31, lng: -84.47 },
    { stidx: 1033, slv: "GA Newton 11 SW", name: "Robert W. Woodruff Foundation (Ichauway-Dubignon Site)", lat: 31.19, lng: -84.44 },
    { stidx: 1111, slv: "GA Watkinsville 5 SSE", name: "USDA/ARS Watkinsville (Colham Ferry Site)", lat: 33.78, lng: -83.38 },
    { stidx: 1120, slv: "GA Brunswick 23 S", name: "Cumberland Island National Seashore (Stafford Field)", lat: 30.8, lng: -81.45 },
    { stidx: 1186, slv: "HI Hilo 5 S", name: "University of Hawaii Waiakea  Experiment Station", lat: 19.64, lng: -155.08 },
    { stidx: 1187, slv: "HI Mauna Loa 5 NNE", name: "Mauna Loa Obsv., NOAA Earth Systems Res. Lab.,Global Mon. Div.", lat: 19.53, lng: -155.57 },
    { stidx: 1116, slv: "IA Des Moines 17 E", name: "Neal Smith NWR (NOAA Station Site)", lat: 41.55, lng: -93.28 },
    { stidx: 1021, slv: "ID Arco 17 SW", name: "Craters of the Moon NM & Preserve (Headquarters Area)", lat: 43.46, lng: -113.55 },
    { stidx: 1022, slv: "ID Murphy 10 W", name: "ARS NW  Watershed Research Cntr. (Reynolds Creek Site)", lat: 43.2, lng: -116.75 },
    { stidx: 1037, slv: "IL Champaign 9 SW", name: "Univ. of Illinois (Bondville Environ. & Atmos. Resrch. Stn.)", lat: 40.05, lng: -88.37 },
    { stidx: 1038, slv: "IL Shabbona 5 NNE", name: "Northern Illinois Agronomy Research Center", lat: 41.84, lng: -88.85 },
    { stidx: 1510, slv: "IN Bedford 5 WNW", name: "Feldun-Purdue Agricultural Center, (Pasture 17 Site)", lat: 38.88, lng: -86.57 },
    { stidx: 1047, slv: "KS Manhattan 6 SSW", name: "Kansas State University (Konza Prairie Biological Station)", lat: 39.1, lng: -96.6 },
    { stidx: 1231, slv: "KS Oakley 19 SSW", name: "The Nature Conservancy Kansas (Smoky Valley Ranch)", lat: 38.87, lng: -100.96 },
    { stidx: 1028, slv: "KY Versailles 3 NNW", name: "University of Kentucky (Woodford County Site)", lat: 38.09, lng: -84.74 },
    { stidx: 1031, slv: "KY Bowling Green 21 NNE", name: "Mammoth Cave National Park (Job Corps Site)", lat: 37.25, lng: -86.23 },
    { stidx: 1012, slv: "LA Monroe 26 N", name: "Upper Ouachita National Wildlife Refuge", lat: 32.88, lng: -92.11 },
    { stidx: 1013, slv: "LA Lafayette 13 SE", name: "University of Louisiana at Lafayette (Cade Farm)", lat: 30.09, lng: -91.87 },
    { stidx: 1034, slv: "ME Old Town 2 W", name: "University of Maine  (Rogers Farm Site)", lat: 44.92, lng: -68.7 },
    { stidx: 1035, slv: "ME Limestone 4 NNW", name: "Aroostook National  Wildlife Ref. (Fire Training Area)", lat: 46.96, lng: -67.88 },
    { stidx: 1113, slv: "MI Chatham 1 SE", name: "Michigan State University (Upper Peninsula Experiment Station)", lat: 46.33, lng: -86.92 },
    { stidx: 1426, slv: "MI Gaylord 9 SSW", name: "National Weather Service, Gaylord", lat: 44.9, lng: -84.72 },
    { stidx: 1039, slv: "MN Goodridge 12 NNW", name: "Agassiz National Wildlife Refuge (Maintenance Shop Site)", lat: 48.3, lng: -95.87 },
    { stidx: 1447, slv: "MN Sandstone 6 W", name: "Audubon Center of  the North Woods", lat: 46.11, lng: -92.99 },
    { stidx: 1142, slv: "MO Chillicothe 22 ENE", name: "University of Missouri (Forage Systems Research Station)", lat: 39.86, lng: -93.14 },
    { stidx: 1406, slv: "MO Salem 10 W", name: "White River Trace Conservation Area (Stand 4, Compartment 7)", lat: 37.63, lng: -91.72 },
    { stidx: 1407, slv: "MO Joplin 24 N", name: "Shawnee Trail Conservation Area", lat: 37.42, lng: -94.58 },
    { stidx: 1036, slv: "MS Newton 5 ENE", name: "Mississippi State University (Coastal Plain Exp. Station)", lat: 32.33, lng: -89.07 },
    { stidx: 1570, slv: "MS Holly Springs 4 N", name: "MSU, MAFES, North MS R&E Center, (North MS Branch)", lat: 34.82, lng: -89.43 },
    { stidx: 1001, slv: "MT Wolf Point 29 ENE", name: "Fort Peck Indian Res. (Poplar River Site)", lat: 48.3, lng: -105.1 },
    { stidx: 1002, slv: "MT Wolf Point 34 NE", name: "Fort Peck Indian Res. (Give Out Morgan Site)", lat: 48.48, lng: -105.2 },
    { stidx: 1046, slv: "MT St. Mary 1 SSW", name: "Glacier National Park (St. Mary Site)", lat: 48.74, lng: -113.43 },
    { stidx: 1468, slv: "MT Dillon 18 WSW", name: "Bannack State Park, Old Freight Road Site", lat: 45.15, lng: -113 },
    { stidx: 1612, slv: "MT Lewistown 42 WSW", name: "Montana Department  Fish, Wildlife & Parks, Judith River WMA", lat: 46.88, lng: -110.28 },
    { stidx: 1026, slv: "NC Asheville 8 SSW", name: "North Carolina  Arboretum (Bierbaum Site)", lat: 35.49, lng: -82.61 },
    { stidx: 1027, slv: "NC Asheville 13 S", name: "NC Mtn. Horticultural Crops Res. Ctr. (Backlund Site)", lat: 35.41, lng: -82.55 },
    { stidx: 1347, slv: "NC Durham 11 W", name: "Duke Forest - Duke University", lat: 35.97, lng: -79.09 },
    { stidx: 1139, slv: "ND Medora 7 E", name: "Theodore Roosevelt National Park (Painted Canyon Site)", lat: 46.89, lng: -103.37 },
    { stidx: 1235, slv: "ND Northgate 5 ESE", name: "Des Lacs National Wildlife Refuge (HB-4 Site)", lat: 48.96, lng: -102.17 },
    { stidx: 1611, slv: "ND Jamestown 38 WSW", name: "North Dakota State University, Central Grasslands (Sec. 14 Site)", lat: 46.77, lng: -99.47 },
    { stidx: 1003, slv: "NE Lincoln 11 SW", name: "Audubon Society (Spring Creek Prairie Site)", lat: 40.69, lng: -96.85 },
    { stidx: 1004, slv: "NE Lincoln 8 ENE", name: "University of Nebraska (Prairie Pines Site)", lat: 40.84, lng: -96.56 },
    { stidx: 1025, slv: "NE Harrison 20 SSE", name: "Agate Fossil Beds National Monument (Visitor Center Site)", lat: 42.42, lng: -103.73 },
    { stidx: 1115, slv: "NE Whitman 5 ENE", name: "Gudmundsen Sandhills Laboratory (Site 1)", lat: 42.06, lng: -101.44 },
    { stidx: 1040, slv: "NH Durham 2 SSW", name: "University of New Hampshire (Thompson Farm Site)", lat: 43.1, lng: -70.94 },
    { stidx: 1041, slv: "NH Durham 2 N", name: "University of New Hampshire (Kingman Farm Site)", lat: 43.17, lng: -70.92 },
    { stidx: 1020, slv: "NM Socorro 20 N", name: "Sevilleta National Wildlife Refuge (LTER Site)", lat: 34.35, lng: -106.88 },
    { stidx: 1138, slv: "NM Los Alamos 13 W", name: "Valles Caldera National Preserve (Valle Grande Site)", lat: 35.85, lng: -106.52 },
    { stidx: 1307, slv: "NM Las Cruces 20 N", name: "Jornada USDA ARS Experimental Range (Jornada Headquarters Site)", lat: 32.61, lng: -106.74 },
    { stidx: 1049, slv: "NV Mercury 3 SSW", name: "Nevada Test Site (Desert Rock Meteorological Lab)", lat: 36.62, lng: -116.02 },
    { stidx: 1106, slv: "NV Baker 5 W", name: "Great Basin National Park (Gravel Pit Site)", lat: 39.01, lng: -114.2 },
    { stidx: 1532, slv: "NV Denio 52 WSW", name: "Sheldon National Wildlife Refuge, (Little Sheldon Site)", lat: 41.84, lng: -119.63 },
    { stidx: 1117, slv: "NY Ithaca 13 E", name: "Cornell University (Harford Teaching & Research Center)", lat: 42.44, lng: -76.24 },
    { stidx: 1118, slv: "NY Millbrook 3 W", name: "Institute of Ecosystem Studies (Environmental Monitoring Station)", lat: 41.78, lng: -73.74 },
    { stidx: 1125, slv: "OH Coshocton 8 NNE", name: "North Appalachian Experimental Watershed (CRN site)", lat: 40.36, lng: -81.78 },
    { stidx: 1005, slv: "OK Stillwater 2 W", name: "Oklahoma State Univ. (Ag.  Research Farm Site)", lat: 36.11, lng: -97.09 },
    { stidx: 1006, slv: "OK Stillwater 5 WNW", name: "Oklahoma State University (Efaw Farm Site)", lat: 36.13, lng: -97.1 },
    { stidx: 1068, slv: "OK Goodwell 2 E", name: "OK  Panhandle Research & Extn. Center (Native Grassland Site)", lat: 36.59, lng: -101.59 },
    { stidx: 1772, slv: "OK Goodwell 2 SE", name: "Oklahoma Panhandle State Univ., School of Agriculture (Permanent Pasture)", lat: 36.56, lng: -101.6 },
    { stidx: 1112, slv: "ON Egbert 1 W", name: "Environment Canada CARE site", lat: 44.23, lng: -79.78 },
    { stidx: 1023, slv: "OR Riley 10 WSW", name: "Northern Great Basin Experimental Range (Rainout Site)", lat: 43.47, lng: -119.69 },
    { stidx: 1145, slv: "OR John Day 35 WNW", name: "John Day Fossil Beds Nat'l. Mon.(Sheep Rock Hdqs.)", lat: 44.55, lng: -119.64 },
    { stidx: 1234, slv: "OR Corvallis 10 SSW", name: "DOI, William L. Finley NWR (East end of Field 22)", lat: 44.41, lng: -123.32 },
    { stidx: 1610, slv: "OR Coos Bay 8 SW", name: "South Slough National Estuarine Research Reserve (Frederickson Marsh Site)", lat: 43.27, lng: -124.31 },
    { stidx: 1123, slv: "PA Avondale 2 N", name: "Stroud Water Research Center", lat: 39.85, lng: -75.78 },
    { stidx: 1042, slv: "RI Kingston 1 NW", name: "University of Rhode Island (Plains Road Site)", lat: 41.49, lng: -71.54 },
    { stidx: 1043, slv: "RI Kingston 1 W", name: "University of Rhode Island (Peckham Farm Site)", lat: 41.47, lng: -71.54 },
    { stidx: 1789, slv: "SA Tiksi 4 SSE", name: "Roshydromet Observatory at Tiksi", lat: 71.58, lng: 128.91 },
    { stidx: 1029, slv: "SC Blackville 3 W", name: "Clemson University (Edisto Research & Edu. Ctr.)", lat: 33.35, lng: -81.32 },
    { stidx: 1030, slv: "SC McClellanville 7 NE", name: "SCDNR (Santee Coastal Reserve)", lat: 33.15, lng: -79.36 },
    { stidx: 1009, slv: "SD Sioux Falls 14 NNE", name: "EROS Data Center", lat: 43.73, lng: -96.62 },
    { stidx: 1140, slv: "SD Buffalo 13 ESE", name: "SDSU Antelope Research Station (Calving Pasture Site)", lat: 45.51, lng: -103.3 },
    { stidx: 1236, slv: "SD Pierre 24 S", name: "Fort Pierre National Grassland (Chester West)", lat: 44.01, lng: -100.35 },
    { stidx: 1446, slv: "SD Aberdeen 35 WNW", name: "The Nature Conservancy (Samuel H. Ordway Prairie, Hdq. Site)", lat: 45.71, lng: -99.12 },
    { stidx: 1121, slv: "TN Crossville 7 NW", name: "Univ. of Tennessee (Plateau Research and Education Center)", lat: 36.01, lng: -85.13 },
    { stidx: 1018, slv: "TX Palestine 6 WNW", name: "NASA (National Scientific Balloon Facility)", lat: 31.77, lng: -95.72 },
    { stidx: 1019, slv: "TX Monahans 6 ENE", name: "Sandhills State Park", lat: 31.62, lng: -102.8 },
    { stidx: 1066, slv: "TX Edinburg 17 NNE", name: "Lower Rio Grande Valley NWR (La Sal Del Rey)", lat: 26.52, lng: -98.06 },
    { stidx: 1067, slv: "TX Muleshoe 19 S", name: "Muleshoe National Wildlife Refuge (Headquarters Site)", lat: 33.95, lng: -102.77 },
    { stidx: 1130, slv: "TX Bronte 11 NNE", name: "Ft. Chadbourne Foundation, (Foundation Entrance Site)", lat: 32.04, lng: -100.24 },
    { stidx: 1306, slv: "TX Panther Junction 2 N", name: "Big Bend National Park", lat: 29.34, lng: -103.2 },
    { stidx: 1386, slv: "TX Austin 33 NW", name: "Balcones National Wildlife Refuge (Flying \"X\" Ranch)", lat: 30.62, lng: -98.08 },
    { stidx: 1387, slv: "TX Port Aransas 32 NNE", name: "Aransas National Wildlife Refuge (Weather Site)", lat: 28.3, lng: -96.82 },
    { stidx: 1507, slv: "UT Brigham City 28 WNW", name: "Golden Spike National Historic Site (Visitor Center Site)", lat: 41.61, lng: -112.54 },
    { stidx: 1509, slv: "UT Torrey 7 E", name: "Capitol Reef National Park, Goosenecks Road Site", lat: 38.3, lng: -111.29 },
    { stidx: 1085, slv: "VA Cape Charles 5 ENE", name: "Anheuser Busch Coastal Res. Ctr. Univ. of  VA (Oyster)", lat: 37.29, lng: -75.92 },
    { stidx: 1346, slv: "VA Charlottesville 2 SSE", name: "Thomas Jefferson Foundation", lat: 37.99, lng: -78.46 },
    { stidx: 1017, slv: "WA Darrington 21 NNE", name: "North Cascades National Park (Marblemount)", lat: 48.54, lng: -121.44 },
    { stidx: 1233, slv: "WA Quinault 4 NE", name: "Olympic National Park (Bishop Field Site)", lat: 47.51, lng: -123.81 },
    { stidx: 1467, slv: "WA Spokane 17 SSW", name: "US Fish & Wildlife Service, Turnbull NWR (Headquarters Site)", lat: 47.41, lng: -117.52 },
    { stidx: 1114, slv: "WI Necedah 5 WNW", name: "Necedah National Wildlife Refuge (Rynearson Dam No. 2)", lat: 44.06, lng: -90.17 },
    { stidx: 1024, slv: "WV Elkins 21 ENE", name: "Canaan Valley Resort State Park (Cabins Area)", lat: 39.01, lng: -79.47 },
    { stidx: 1107, slv: "WY Moose 1 NNE", name: "Grand Teton National Park", lat: 43.66, lng: -110.71 },
    { stidx: 1144, slv: "WY Lander 11 SSE", name: "Nature Conservancy (Red Canyon Ranch)", lat: 42.67, lng: -108.66 },
    { stidx: 1487, slv: "WY Sundance 8 NNW", name: "Bear Lodge Ranger Dist, Black Hills NF (Massengale Flats Site)", lat: 44.51, lng: -104.43 }
];


$(document).ready(function() {

    var map = L.map('map',{
        attributionControl: false,
        zoomControl: false
    }).setView([40.0, -98.0], 5);

    L.tileLayer('https://{s}.tiles.mapbox.com/v3/{id}/{z}/{x}/{y}.png', {
        maxZoom: 18,
        id: 'examples.map-i875mjb7'
    }).addTo(map);

    var station_markers = [];

    stations.forEach(function(station) {
        var marker = L.marker([station.lat, station.lng]); 
        marker.bindPopup(station.slv, {
            closeButton: false
        });

        marker.on('mouseover', function(e) {
            marker.openPopup();
        });
        marker.on('mouseout', function(e) {
            marker.closePopup();
        });
        marker.on('click', function(e) {
            marker.closePopup();
            var latlng = L.latLng(station.lat, station.lng);
            L.popup({
                className: "graph-popup",
                maxWidth: 800,
                maxHeight: 400
            }).setLatLng(latlng)
                .setContent('<div><h4>' + station.slv + '</h4><div id="thegraph" style="width: 100%; height: 300px;"></div></div>')
                .openOn(map);
            $('#thegraph').multigraph({
                muglString : generate_mugl(station.stidx)
            });
        });


        station_markers.push(marker);
    });

    var stationGroup = L.layerGroup(station_markers).addTo(map);

//    stationGroup.eachLayer(function(layer) {
//        console.log(layer);
//        //layer.bindLabel('hooha', { noHide: true });
//    });


});
