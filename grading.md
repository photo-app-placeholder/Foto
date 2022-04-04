# Foto Grading

Great work devs! I love the black/white minimalist styling -- super chic. Here are a few notes but be sure to checkout inline comments also.

- REST - your create routes aren't RESTful - `/photos/new` and `/albums/new`
- Not sure if I just did something weird but I got an alert to confirm my email but then didn't actually have to. Might want to update `components/Auth.js`
- You have a few console.logs scattered - always good to clear those up
- Hooks should start with `use` so change `ProfileHook` to `useProfile`
- `getProfile` and `getProfileByUserId` both seem to be doing the same thing? Also, if you add `.single()` to the end of those database calls you can avoid the weirdness of having your profile info nested in an array
- Your `ImageView` and `AlbumView`s are pretty complex - might be worth thinking about breaking out into multiple components
