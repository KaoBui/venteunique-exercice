<script setup>
defineProps({ cartCount: { type: Number, default: 0 } })
defineEmits(['open-project', 'open-cart'])

const navBefore = ['Promotions', 'Nouveautés', 'Inspirations & conseils']
const navAfter = ['Corner Prestige', 'Espace Pro']
</script>

<template>
  <header class="header">
    <div class="header__top">
      <a href="#" class="header__logo" aria-label="Vente-unique, accueil" @click.prevent="$emit('open-project')">
        <img src="/icons/logo-vente-unique.svg" width="217" height="33" alt="" />
      </a>
      <div class="search">
        <img src="/icons/search.svg" width="24" height="24" alt="" />
        <span class="search__placeholder">Rechercher un produit, un catalogue</span>
        <img src="/icons/camera.svg" width="24" height="24" alt="" />
      </div>
      <a href="#" class="header__action" @click.prevent>
        Aide &amp; Contact <img src="/icons/help.svg" width="26" height="26" alt="" />
      </a>
      <a href="#" class="header__action" @click.prevent>
        Se connecter <img src="/icons/account.svg" width="26" height="26" alt="" />
      </a>
      <button type="button" class="header__action" @click="$emit('open-cart')">
        Panier
        <span class="cart-icon">
          <img src="/icons/cart.svg" width="26" height="26" alt="" />
          <span v-if="cartCount" class="cart-badge">{{ cartCount }}<span class="sr-only"> articles</span></span>
        </span>
      </button>
    </div>
    <nav class="header__nav" aria-label="Navigation principale">
      <a href="#" class="nav-item nav-item--menu" @click.prevent>
        <img src="/icons/menu.svg" width="20" height="20" alt="" /> Tous nos produits
      </a>
      <span class="nav-sep" aria-hidden="true" />
      <a v-for="item in navBefore" :key="item" href="#" class="nav-item" @click.prevent>{{ item }}</a>
      <a href="#" class="nav-item nav-item--active" aria-current="page" @click.prevent="$emit('open-project')">
        Mon projet d'aménagement
      </a>
      <a v-for="item in navAfter" :key="item" href="#" class="nav-item" @click.prevent>{{ item }}</a>
    </nav>
  </header>
</template>

<style scoped>
.header {
  background: var(--color-surface-default);
  border-bottom: 1px solid var(--color-border-subtle);
}
.header__top {
  display: flex;
  align-items: center;
  gap: 32px;
  padding: 8px 56px 8px 48px;
}
.header__logo {
  flex-shrink: 0;
}
.search {
  flex: 1;
  display: flex;
  align-items: center;
  gap: 12px;
  height: 48px;
  padding: 0 12px;
  border: 1px solid var(--color-border-strong);
  border-radius: 14px;
  background: var(--color-surface-subtle);
}
.search__placeholder {
  flex: 1;
  font-size: 14px;
  color: var(--color-text-muted);
}
.header__action {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  font-size: 14px;
  line-height: 20px;
  font-weight: 500;
  color: var(--color-text-default);
  text-decoration: none;
  white-space: nowrap;
}
.cart-icon {
  position: relative;
}
.cart-badge {
  position: absolute;
  top: -6px;
  right: -8px;
  min-width: 18px;
  height: 18px;
  padding: 0 5px;
  border-radius: 9px;
  background: var(--color-brand-default);
  color: var(--color-text-inverse);
  font-size: 11px;
  line-height: 18px;
  font-weight: 600;
  text-align: center;
}
.header__nav {
  display: flex;
  align-items: center;
  gap: 32px;
  padding: 12px 56px 0;
}
.nav-item {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding-bottom: 12px;
  border-bottom: 2px solid transparent;
  font-size: 16px;
  line-height: 24px;
  color: var(--color-text-default);
  text-decoration: none;
  white-space: nowrap;
}
.nav-item--menu {
  padding-bottom: 14px;
  border: 0;
}
.nav-item--active {
  font-weight: 500;
  color: var(--color-text-strong);
  border-bottom-color: var(--color-text-strong);
}
.nav-sep {
  width: 1px;
  height: 28px;
  margin-bottom: 14px;
  background: var(--color-border-subtle);
}
</style>
