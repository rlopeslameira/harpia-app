import React from "react";
import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  imageBackground: {
    width: "100%",
    height: 180,
    marginTop: -4,
  },

  containerInfo: {
    flex: 1,
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    padding: 6,
  },

  imageProfile: {
    width: 80,
    height: 80,
    borderRadius: 40,
    marginTop: 6,
  },

  logo: {
    width: 120,
    height: 80,
    backgroundColor: 'white',
    borderRadius: 6
  },

  containerData: {
    flex: 1,
    width: '100%',
  },

  textData: {
    fontSize: 12,
    color: "#fff",
    fontWeight: "bold",
  },

  btMenu: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'transparent',
    width: 80,
    height: 80,
    margin: 4,
    padding: 4,
  },

  btMenuSelected: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#4682B4',
    width: 90,
    height: 90,
    borderWidth: 1,
    borderColor: '#4682B4',
    color: '#FFF',
  }
});
