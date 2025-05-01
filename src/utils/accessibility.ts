const focusableSelectors = [
  'a[href]',
  'area[href]',
  'button',
  'input',
  'select',
  'textarea',
  'iframe',
  'audio[controls]',
  'video[controls]',
  '[contenteditable]',
  '[tabindex]',
  'summary',
];

/**
 * 주어진 요소가 실제로 포커스 가능한지 판단
 * 아래 조건을 모두 만족해야 포커스 가능 판단
 * - 시각적으로 보임 (display, visibility, DOM에 존재)
 * - disabled, aria-disabled, inert 속성이 없음
 * - aria-hidden 되지 않음
 * - tabIndex가 없거나 0 이상인 경우
 *
 * @param el - 포커스 가능 여부를 판단할 HTML 요소
 * @returns {boolean} - 주어진 요소가 포커스 가능하면 true, 그렇지 않으면 false
 */
const calIsFocusable = (el: HTMLElement): boolean => {
  const style = getComputedStyle(el);

  // display: none, visibility: hidden, 렌더링되지 않음
  const isHidden =
    style.display === 'none' ||
    style.visibility === 'hidden' ||
    el.offsetParent === null;

  // tabIndex가 없거나 0 이상일 경우 포커스 가능
  const tabIndex = el.getAttribute('tabindex');
  const isTabIndexFocusable = tabIndex === null || parseInt(tabIndex, 10) >= 0;

  // disabled 속성 또는 aria-disabled 속성이 있을 경우 포커스 불가
  const isDisabled =
    el.hasAttribute('disabled') || el.getAttribute('aria-disabled') === 'true';

  // inert, aria-hidden 속성이 있을 경우 포커스 불가
  const isInert = el.hasAttribute('inert');
  const isAriaHidden = el.getAttribute('aria-hidden') === 'true';

  return (
    !isHidden && !isDisabled && !isInert && !isAriaHidden && isTabIndexFocusable
  );
};

/**
 * 주어진 컨테이너 내에서 실제로 포커스 가능한 모든 요소를 반환
 * 사용자는 키보드(Tab 등)를 이용해 이 요소들 간 이동이 가능
 * @param container - 포커스 가능한 요소
 * @returns {HTMLElement[]} - 포커스 가능한 요소 리스트
 */
export const calGetFocusableElements = (
  container: HTMLElement | null,
): HTMLElement[] => {
  if (!container) return [];

  // 모든 잠재적인 포커스 대상 요소들을 반환
  const nodeList = container.querySelectorAll<HTMLElement>(
    focusableSelectors.join(','),
  );
  const allElements = Array.from(nodeList);

  // 필터링을 통해 실제로 포커스 가능한 요소만 반환
  const focusableElements = allElements.filter((element) => {
    const isFocusable = calIsFocusable(element);
    return isFocusable;
  });
  return focusableElements;
};
