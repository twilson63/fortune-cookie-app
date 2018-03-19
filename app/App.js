import React from 'react'
import { StyleSheet, Text, View, TouchableHighlight, Image } from 'react-native'
import fortuneCookies from 'fortune-cookie'
import randomInt from 'random-int'
import Container from 'react-declarative-container'
import FortuneCookieImage from './fortune-cookie.png'

const action = (type, payload) => ({ type, payload })

export default class App extends React.Component {
  render() {
    return (
      <Container
        initialState={{
          fortune: 'press the button and I will predict your future...'
        }}
      >
        {({ fortune, dispatch }) => (
          <View style={styles.container}>
            <Image
              style={{ height: 100, width: 100 }}
              source={FortuneCookieImage}
            />
            <Text style={{ fontSize: 24, color: 'rgba(0,0,0,.28)' }}>
              Fortune Cookie
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
        )}
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
