# [Live Demo](https://daoudmerchant.github.io/shopping-cart)

## Brief

To create a simple shopping website in React using React Router to use URLs to navigate

## Thoughts before beginning

I'm going to set myself a few different additional challenges:

- Basic storefront sorting
- Basic search
- Use of `styled-components` package

## Thoughts after finishing

Right... Well, as always, I feel I could work on this one forever! There are things I'm proud of and things I know could be done better.

### Successes

- Item pages are assigned separate URLs programatically (updating the `inventory` will automatically generate a new item page)
- (Mostly) adaptive to all screen sizes/orientations (room for improvement)
- Use of `styled-components` avoids many messy declared style objects

### Room for improvement (were time infinite...)

#### Theming (very basic red theme could be improved / supplemented with custom svg graphics etc.)

I could have spent much more time on the theme, but graphic design is a discipline in itself and I want to advance with my JS knowledge.

#### Product page

This is very bare, normally there'd be related products, reviews...

#### Code related to options

As the only form of option on the site is color (and accommodating options was already beyond the initial scope of the exercise), my code refers to `color` specifically, but there could be all kinds of options... Say, for example, the games were available digitally or physically, the code should find whatever additional key the `option` object contains and use that to generate the drop-down and product pages.

#### Routing

My search is super basic, but one of the many things I should do to flesh it out is generate URLs based on search (e.g. `shopping-cart/search?super+mario`), but this is so much to do with server-side logic I don't understand (not to mention the lack of fuzzy search) that whatever solution I came up with would be 'faking it' (as it is, my `justSearched` solution to keep search text constant in the header without always applying to the page is less than elegant).

As things stand, I think it a better user experience to go to the cart upon 'Add to Cart', but were the browser to remain on the item page, anything `<select>` would currently reset to the first `<option>` upon rerender. I guess the solution would be to have separate URLs for every option (which would improve the experience in terms of URL navigation), but this would force a rerender on every option change affecting performance... Again, this is one of the problems best attacked when I understand server-side logic.

I'm also aware that every choice in the `ShopFilterBar` could also be 'baked' in to the URL, but again, this is way beyond the scope of the exercise!

#### Image loading

Once again, one image size for all scenarios (far too large a file size for the smaller rendering scenarios), popping in on load... `srcset` and more elegant image loading would be a priority were I preparing this site for real deployment!

#### State management

I'm aware that every time state is altered, the element and all of its children are rerendered (even if the child's `props` remain the same, it can't be memoised because the parent itself is rerendering), but this led to various problems... In `Routes.js`, it made sense to have:

```jsx
// simplified
<Router>
  <Header />
  <Switch>
    <Route path="/" component={Main} />
    {inventory.map((item) => {
      return (
        <Route
          path={`/${itemUrl}`}
          component={() => <ItemPage item={item} />}
        />
      );
    })}
    <Route path="/cart" component={Cart} />
  </Switch>
</Router>
```

But the problem here is that `Header` needs access to the cart to know what number to display on the cart icon as well as the `Cart` element, and if the search box in the `Header` needs to pass the information to `Main` then _that_ needs to be stored in a parent... As a result, `Routes` ended up storing cart and search logic which had nothing to do with it! The only solution I could think of would be to store the logic _above_ `Routes`, or rather outside of it, which I guess is the basis for Redux (I saw some other student solutions use it). As I was already fearing biting off more than I could chew, I decided to leave learning Redux for my learning 'to do' list. I definitely want to implement it in a future project!

#### Props handling

There's some refactoring to be done when I better understand `useContext` to remove some of the props drilling.
