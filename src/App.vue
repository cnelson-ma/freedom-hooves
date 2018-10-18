<template>
  <div id="app">
    <div id="nav">
      <router-link to="/">Display</router-link>
      <router-link to="/bidding">Bidding</router-link>
    </div>
    <router-view/>
  </div>
</template>

<style>
#app {
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
#nav {
  padding: 0;
  height: 20px;
  text-align: center;
}

#nav a {
  font-weight: bold;
  color: #fff;
  width: 40%;
  text-align: center;
  display: inline-block;
}
#nav a:hover {
  color: #000;
}
</style>
