import React from 'react'
import { StyleSheet, Text, View, TouchableHighlight, Image } from 'react-native'
import fortuneCookies from 'fortune-cookie'
import randomInt from 'random-int'
import Container from 'react-declarative-container'
import FortuneCookieImage from './fortune-cookie.png'
import { Asset, AppLoading } from 'expo'
import { cond, equals, always } from 'ramda'

const action = (type, payload) => ({ type, payload })

export default class App extends React.Component {
  render() {
    return (
      <Container
        initialState={{
          status: 'LOADING',
          fortune: 'press the button and I will predict your future...'
        }}
      >
        {({ fortune, status, dispatch }) =>
          cond([
            [
              equals('LOADING'),
              always(
                <AppLoading
                  startAsync={() => {
                    // TODO: Cache Images and Fonts...
                    Promise.resolve(true)
                  }}
                  onError={console.warn}
                  onFinish={() => {
                    dispatch(action('status', 'READY'))
                  }}
                />
              )
            ],
            [
              equals('READY'),
              always(
                <View style={styles.container}>
                  <Image
                    style={{ height: 100, width: 100 }}
                    source={FortuneCookieImage}
                  />
                  <Text style={{ fontSize: 24, color: 'rgba(0,0,0,.28)' }}>
                    Have a Cookie and a Fortune
                  </Text>
                  <Text style={{ marginHorizontal: 16, marginTop: 8 }}>
                    {fortune}
                  </Text>
                  <TouchableHighlight
                    style={{
                      margin: 16,
                      borderWidth: 2,
                      padding: 8,
                      borderRadius: 4
                    }}
                    onPress={() =>
                      dispatch(
                        action(
                          'fortune',
                          fortuneCookies[randomInt(fortuneCookies.length - 1)]
                        )
                      )
                    }
                  >
                    <Text>Predict My Future</Text>
                  </TouchableHighlight>
                </View>
              )
            ]
          ])(status)
        }
      </Container>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center'
  }
})
