<template>
  <header>
    <img src="./assets/logo.png" alt="logo du site" />
    <h1>Vue Quiz</h1>
  </header>
  <main>
    <RouterView />
  </main>
</template>

<style>
header {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 1rem;
  padding: 1rem !important;
}
main {
  margin: 1rem;
  padding: 1rem;
  border-top: 1px solid lightgray;
}
</style>
