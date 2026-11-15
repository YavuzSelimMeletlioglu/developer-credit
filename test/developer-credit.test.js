import { test } from 'node:test';
import assert from 'node:assert/strict';
import { LABELS, PROFILE_URL, NAME, resolveLang, dirOf } from '../src/developer-credit.js';

test('SSR: tarayıcı olmadan içe aktarmak hata vermez', () => {
	assert.equal(typeof globalThis.HTMLElement, 'undefined');
	assert.equal(NAME, 'Yavuz Selim Meletlioğlu');
});

test('resolveLang: bölge kodunu ayıklar, bilinmeyeni İngilizceye düşürür', () => {
	assert.equal(resolveLang('tr'), 'tr');
	assert.equal(resolveLang('tr-TR'), 'tr');
	assert.equal(resolveLang('AR-sa'), 'ar');
	assert.equal(resolveLang('fr'), 'en');
	assert.equal(resolveLang(''), 'en');
	assert.equal(resolveLang(undefined), 'en');
	assert.equal(resolveLang('constructor'), 'en');
});

test('dirOf: yalnızca Arapça sağdan sola', () => {
	assert.equal(dirOf('ar'), 'rtl');
	for (const l of ['tr', 'en', 'de', 'ru']) assert.equal(dirOf(l), 'ltr');
});

test('her dilin metni dolu ve profil adresi doğru', () => {
	for (const text of Object.values(LABELS)) assert.ok(text.length > 0);
	assert.equal(PROFILE_URL, 'https://meletiq.co/');
});
