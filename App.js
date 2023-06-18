import React, { useState, useEffect } from 'react';
import {
  View,
  TouchableOpacity,
  Text,
  StyleSheet,
  Image,
  Dimensions,
  PermissionsAndroid,
} from 'react-native';
import MapView, { Marker } from 'react-native-maps';

const carousel = [
  'Todos',
  'Arte & Arquitetura',
  'Centros de Compras',
  'Eventos Culturais & Festivais',
  'Fortes',
  'História & Cultura',
  'Mercados & Feiras',
  'Parques & Áreas Verdes',
  'Pontes',
  'Praias',
  'Turismo Religioso',
];

const App = () => {
  const [activeButton, setActiveButton] = useState('page1');
  const [zoom, setZoom] = useState(0.025); // Valor inicial do zoom
  const [currentLocation, setCurrentLocation] = useState(null);
  const [currentCategoryIndex, setCurrentCategoryIndex] = useState(0);

  useEffect(() => {
    requestLocationPermission();
  }, []);

  const requestLocationPermission = async () => {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION
      );
      if (
        granted === PermissionsAndroid.RESULTS.GRANTED &&
        navigator.geolocation
      ) {
        navigator.geolocation.getCurrentPosition(
          (position) => {
            const { latitude, longitude } = position.coords;
            setCurrentLocation({ latitude, longitude });
          },
          (error) => console.error(error),
          { enableHighAccuracy: true, timeout: 20000, maximumAge: 1000 }
        );
      } else {
        console.log('Permission denied or geolocation is not supported');
      }
    } catch (err) {
      console.warn(err);
    }
  };

  const handleButtonPress = (page) => {
    setActiveButton(page);
  };

  const changeCategory = (step) => {
    const newIndex = (currentCategoryIndex + step + carousel.length) % carousel.length;
    setCurrentCategoryIndex(newIndex);
  };

  const renderPage = () => {
    switch (activeButton) {
      case 'page1':
        return (
          <View style={styles.page}>
            <View style={styles.container2}>
              <View style={styles.logo}>
                <Image source={require('./recitur.png')} style={styles.logoImage} />
              </View>
              <View style={styles.null5}></View>
              <View style={styles.homeText}>
                <Text>Início</Text>
              </View>
              <TouchableOpacity style={styles.locationButton} data-active="false">
                <Image source={require('./aim.png')} style={styles.buttonImage} />
              </TouchableOpacity>
              <TouchableOpacity style={styles.routeButton}>
                <Image source={require('./route.png')} style={styles.buttonImage} />
              </TouchableOpacity>
            </View>
            <MapView
              style={styles.map}
              initialRegion={{
                latitude: -8.0595,
                longitude: -34.8713,
                latitudeDelta: 0.0922,
                longitudeDelta: 0.0421,
              }}
              region={currentLocation && {
                latitude: currentLocation.latitude,
                longitude: currentLocation.longitude,
                latitudeDelta: 0.0922,
                longitudeDelta: 0.0421,
              }}
              customMapStyle={[
                {
                  featureType: 'poi',
                  elementType: 'labels',
                  stylers: [
                    {
                      visibility: 'off',
                    },
                  ],
                },
              ]}
            >
              {/* Marcador personalizado */}
  <Marker
    coordinate={{ latitude: -8.0648381, longitude: -34.8738708 }}
    title="Meu Marcador"
    description="Este é um marcador personalizado"
    // Aqui você pode adicionar ícone personalizado usando o prop "image" do Marker
  />
              {currentLocation && (
                <Marker
                  coordinate={{
                    latitude: currentLocation.latitude,
                    longitude: currentLocation.longitude,
                  }}
                  title="Minha Localização"
                  image={require('./recitur.png')}
                />
              )}
            </MapView>
            <View style={styles.container4}>
              <View style={styles.categories2}>
                <Text style={styles.categoriesText2}>Passe para exibir</Text>
                <TouchableOpacity style={styles.backArrow2}>
                  <Image source={require('./back-arrow.png')} style={styles.arrowImage} />
                </TouchableOpacity>
                <TouchableOpacity style={styles.nextArrow2}>
                  <Image source={require('./next-arrow.png')} style={styles.arrowImage} />
                </TouchableOpacity>
              </View>
            </View>
            <View style={styles.board}></View>
          </View>
        );
      case 'page2':
        return (
          <View style={styles.page}>
            <View style={styles.header}>
              <View style={styles.logo2}>
                <Image source={require('./recitur.png')} style={styles.logoImage} />
              </View>
              <View style={styles.headerTexto}>
                <Text>Lista de Pontos Turísticos</Text>
              </View>
              <View style={styles.null2}></View>
            </View>
            <View style={styles.null}></View>
            <View style={styles.container3}>
              <View style={styles.categories}>
                <Text style={styles.categoriesText}>
                  {carousel[currentCategoryIndex]}
                </Text>
                <TouchableOpacity
                  style={styles.backArrow}
                  onPress={() => changeCategory(-1)}
                >
                  <Image
                    source={require('./back-arrow.png')}
                    style={styles.arrowImage}
                  />
                </TouchableOpacity>
                <TouchableOpacity
                  style={styles.nextArrow}
                  onPress={() => changeCategory(1)}
                >
                  <Image
                    source={require('./next-arrow.png')}
                    style={styles.arrowImage}
                  />
                </TouchableOpacity>
              </View>
            </View>
            <View style={styles.board}></View>
          </View>
        );
      case 'page3':
        return (
          <View style={styles.header}>
            <View style={styles.logo}>
            <Image source={require('./recitur.png')} style={styles.logoImage} />
            </View>
            <View style={styles.headerTexto}>
              <Text>Lista de Guias Turísticos</Text>
            </View>
            <View style={styles.null2}></View>
          </View>
        );
      case 'page4':
        return (
          <View style={styles.page}>
            <View style={styles.header}>
              <View style={styles.logo}>
              <Image source={require('./recitur.png')} style={styles.logoImage} />
              </View>
              <View style={styles.headerTexto}>
                <Text>Opções</Text>
              </View>
              <View style={styles.null2}></View>
            </View>
            <View style={styles.empty}></View>
            <TouchableOpacity
              style={styles.emailsupport}
              onPress={() => openEmail()}
            >
              <Text>Precisa falar conosco? Clique aqui!</Text>
            </TouchableOpacity>
            <View style={styles.empty2}></View>
            <View style={styles.vazio}>
              <View style={styles.pedidos}>
                <TouchableOpacity
                  style={styles.emailsupport2}
                  onPress={() => openEmail2()}
                >
                  <Text>É guia e quer se cadastrar? Clique aqui!</Text>
                </TouchableOpacity>
                <Text>Mande para nosso email:</Text>
                <Text>Nome</Text>
                <Text>E-mail</Text>
                <Text>Foto (máx. 2 mega)</Text>
                <Text>PDF do seu CPF</Text>
                <Text>PDF do seu certificado Cadastur</Text>
                <Text>Local aonde atua (ex.: Derby, Recife - PE)</Text>
                <Text>Uma breve descrição sobre você</Text>
              </View>
            </View>
          </View>
        );
      default:
        return null;
    }
  };

  return (
    <View style={styles.container}>
      {renderPage()}
      <View style={styles.navbar}>
        <TouchableOpacity
          style={[
            styles.navbarButton,
            activeButton === 'page1' && styles.activeButton,
          ]}
          onPress={() => handleButtonPress('page1')}
        >
          <Image
            source={require('./home.png')}
            style={[styles.icon, activeButton === 'page1' && styles.activeIcon]}
          />
          <Text>Início</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[
            styles.navbarButton,
            activeButton === 'page2' && styles.activeButton,
          ]}
          onPress={() => handleButtonPress('page2')}
        >
          <Image
            source={require('./list.png')}
            style={[styles.icon, activeButton === 'page2' && styles.activeIcon]}
          />
          <Text>Lista</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[
            styles.navbarButton,
            activeButton === 'page3' && styles.activeButton,
          ]}
          onPress={() => handleButtonPress('page3')}
        >
          <Image
            source={require('./tour-guide.png')}
            style={[styles.icon, activeButton === 'page3' && styles.activeIcon]}
          />
          <Text>Guia</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[
            styles.navbarButton,
            activeButton === 'page4' && styles.activeButton,
          ]}
          onPress={() => handleButtonPress('page4')}
        >
          <Image
            source={require('./gear.png')}
            style={[styles.icon, activeButton === 'page4' && styles.activeIcon]}
          />
          <Text>Opções</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  navbar: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    height: '5.5%',
    position: 'absolute',
    bottom: 0,
    width: '100%',
    zIndex: 1,
  },
  navbarButton: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  activeButton: {
    backgroundColor: '#DFDFDF',
    borderRadius: 24,
  },
  icon: {
    width: '20%',
    height: '40%',
    tintColor: '#5F5F5F',
  },
  activeIcon: {
    tintColor: '#000000',
  },
  page: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    width: windowWidth,
    height: windowHeight,
  },
  pageText: {
    fontSize: 24,
  },
  // Código criado por mim
  // Page1
  map: {
    height: windowHeight,
    width: windowWidth,
  },
  container2: {
    backgroundColor: '#FFFFFF',
    width: '100%',
    height: '10%',
    flexDirection: 'row',
    position: 'absolute',
    top: 0,
    zIndex: 2,
  },
  logo: {
    backgroundColor: '#FFFFFF',
    width: '15%',
    height: '50%',
    justifyContent: 'center',
    alignItems: 'center',
    top: '9%',
  },
  logoImage: {
    width: '63%',
    height: '88%',
  },
  null5: {
    backgroundColor: '#FFFFFF',
    width: '15%',
    height: '50%',
    justifyContent: 'center',
    alignItems: 'center',
    top: '9%',
  },
  homeText: {
    backgroundColor: '#FFFFFF',
    width: '40%',
    height: '50%',
    justifyContent: 'center',
    alignItems: 'center',
    top: '9%',
  },
  locationButton: {
    backgroundColor: '#DFDFDF',
    width: '13%',
    height: '43%',
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    margin: '1%',
    top: '9%',
  },
  buttonImage: {
    width: '63%',
    height: '88%',
  },
  routeButton: {
    backgroundColor: '#DFDFDF',
    width: '13%',
    height: '43%',
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    margin: '1%',
    top: '9%',
  },
  container4: {
    flexDirection: 'column',
    backgroundColor: '#EFEFEF',
    justifyContent: 'center',
    alignItems: 'center',
    width: windowWidth,
    height: '6%',
    position: 'absolute',
    top: '10%',
    zIndex: 2,
    display: 'none',
  },
  categories2: {
    display: 'flex',
    width: '98%',
    height: '81%',
    backgroundColor: '#9F9F9F',
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
  },
  categoriesText2: {
    width: '100%',
    height: '100%',
    backgroundColor: 'transparent',
    color: '#FFFFFF',
    fontWeight: 'bold',
    textAlign: 'center',
    top: 9,
  },
  backArrow2: {
    position: 'absolute',
    top: '10%',
    left: '1%',
    backgroundColor: 'transparent',
    width: '10%',
    height: '100%',
  },
  nextArrow2: {
    position: 'absolute',
    top: '10%',
    right: '-1%',
    backgroundColor: 'transparent',
    width: '10%',
    height: '100%',
  },
  board: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: 'white',
    padding: 10,
    width: windowWidth,
    height: '30%',
  },
  // Page2
  header: {
    backgroundColor: '#FFFFFF',
    width: '100%',
    height: '10%',
    flexDirection: 'row',
    position: 'absolute',
    top: 0,
    zIndex: 2,
  },
  logo2: {
    backgroundColor: '#FFFFFF',
    width: '15%',
    height: '50%',
    justifyContent: 'center',
    alignItems: 'center',
    top: '9%',
  },
  headerTexto: {
    backgroundColor: '#FFFFFF',
    width: '70%',
    height: '50%',
    justifyContent: 'center',
    alignItems: 'center',
    top: '9%',
  },
  null2: {
    backgroundColor: '#FFFFFF',
    width: '15%',
    height: '50%',
    justifyContent: 'center',
    alignItems: 'center',
    top: '9%',
  },
  container3: {
    flexDirection: 'column',
    backgroundColor: '#EFEFEF',
    justifyContent: 'center',
    alignItems: 'center',
    width: windowWidth,
    height: '6%',
    position: 'absolute',
    top: '10%',
    zIndex: 2,
  },
  categories: {
    display: 'flex',
    width: '98%',
    height: '81%',
    backgroundColor: '#9F9F9F',
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
  },
  categoriesText: {
    width: '100%',
    height: '100%',
    backgroundColor: 'transparent',
    color: '#FFFFFF',
    fontWeight: 'bold',
    textAlign: 'center',
    top: 9,
  },
  backArrow: {
    position: 'absolute',
    top: '10%',
    left: '1%',
    backgroundColor: 'transparent',
    width: '10%',
    height: '100%',
  },
  nextArrow: {
    position: 'absolute',
    top: '10%',
    right: '-1%',
    backgroundColor: 'transparent',
    width: '10%',
    height: '100%',
  },
  // Page3
  // Page4
  empty: {
    width: '100%',
    backgroundColor: '#FFFFFF',
  },
  empty2: {
    width: '100%',
    height: '2.5%',
    backgroundColor: '#FFFFFF',
  },
  vazio: {
    backgroundColor: '#FFFFFF',
    width: '100%',
    height: '20%',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    display: 'flex',
    fontWeight: 'bold',
  },
  pedidos: {
    backgroundColor: '#AFAFAF',
    height: '120%',
    width: '96%',
    borderRadius: 24,
    justifyContent: 'center',
    alignItems: 'center',
    textAlign: 'center',
  },
  emailsupport: {
    width: '96%',
    height: '6%',
    backgroundColor: '#FFBF00',
    borderRadius: 24,
    fontWeight: 'bold',
    justifyContent: 'center',
    alignItems: 'center',
  },
  emailsupport2: {
    width: '100%',
    height: '30%',
    backgroundColor: '#00BF00',
    borderRadius: 24,
    fontWeight: 'bold',
    justifyContent: 'center',
    alignItems: 'center',
    top: -5,
  },
});

export default App;
