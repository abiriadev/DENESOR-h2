const like = require('../modules/utils/like')

describe('list', () => {
    test('like it?', () => {
        let complete = null

        const msg = {
            react(emoji) {
                if (['👌', '❤', '✅', '👍', '😉'].includes(emoji)) {
                    expect(true).toBe(true)
                }
            },
        }
    })

    test("it's just luck", () => {
        let complete = null

        const msg = {
            react(emoji) {
                if (['👌', '❤', '✅', '👍'].includes(emoji)) {
                    expect(true).toBe(true)
                }
            },
        }
    })

    test("it's just luck2", () => {
        let complete = null

        const msg = {
            react(emoji) {

            },
        }

        expect(like(msg)).toBe(false)
})
