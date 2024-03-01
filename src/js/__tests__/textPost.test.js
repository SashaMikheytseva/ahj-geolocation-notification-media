/**
 * @jest-environment jsdom
 */

import TextPost from '../TextPost';

const post = new TextPost();

test('Валидно с пробелом', () => {
  const received = post.checkValidity('51.50851, -0.1257');
  expect(received).toEqual(['51.50851, -0.1257']);
});

test('Валидно без пробела', () => {
  const received = post.checkValidity('51.50851,0.1257');
  expect(received).toEqual(['51.50851,0.1257']);
});

test('Пустое поле', () => {
  const received = post.checkValidity('');
  expect(received).toBe(null);
});

test('Не правильный формат', () => {
  const received = post.checkValidity('675667,4883939');
  expect(received).toBe(null);
});

test('Не валидно', () => {
  const received = post.checkValidity('fgdhhdhd, 34.99393');
  expect(received).toBe(null);
});
