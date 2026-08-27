# Notes

## 1. Avatar badge

When I removed `position: relative` from the avatar wrapper, the badge moved to a different place instead of staying on the avatar. It went to the position of another parent element because there was no relative parent for the absolute badge. When I added `position: relative` back, the badge came back to the top-right of the avatar.

## 2. Z-index and stacking context

I gave the card `z-index: 9999`, but it was still going behind the other card. The problem was that the parent had a transform, which created a separate stacking context. So the card could not come out of that wrapper and appear above elements outside it.

## 3. Wrong-row bug

I used `key={index}` for the product rows and changed the quantity of the last product to 7. After sorting the products by price, the 7 stayed in the same row position but it was now showing for another product. React was treating the position as the identity, so changing the key to `key={product.id}` made the quantity stay with the correct product.

## 4. Filter state in the URL

Because the filters are in the URL, I can copy the URL and open it somewhere else and get the same filtered products. I can also use the browser back button to go back to my previous filters. It also makes it easier to share a particular filtered product page.

## 5. Local state instead of Zustand

I used `useState` for opening and closing the modal. I could have put it in Zustand, but there was no need because only that component needs to know if the modal is open. Keeping it local makes the Zustand store simpler.

## 6. What I am least confident about

I am still not completely confident about stacking contexts and z-index. Sometimes I understand the problem, but I get confused about which parent is causing the element to stay behind another element. I also need more practice with responsive design, especially making sure the layout looks good on mobile without affecting the desktop version.