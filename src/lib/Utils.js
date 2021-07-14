const dicTimes = {
    "Arizona Cardinals": [
        "data:image/jpeg;base64,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",
        "https://www.azcardinals.com"
    ],

    "Atlanta Falcons": [
        "https://fanatics.frgimages.com/FFImage/thumb.aspx?i=/productimages/_3335000/altimages/ff_3335980-6081e0cf41f8aa144ec9alt1_full.jpg&w=900",
        "https://www.atlantafalcons.com/"
    ],

    "Baltimore Ravens": [
        "data:image/png;base64,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",
        "https://www.baltimoreravens.com/"
    ],

    "Buffalo Bills": [
        "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAOEAAADhCAMAAAAJbSJIAAAA21BMVEX///8AM43GDDAAHoYAHIYAJYgAMYwAK4oAIYcAE4TAxtsAKYoAGYUALosAJokAGoXO0+MADYPf4uywt9GWoMMAEYO5wNfz9Phmdqxse691g7Obpcbq7PPHy97FACYAAH3EACNSZqPZ3enT1+XDABbDAByGkrtHXZ+mrszCABAlRJQtSZZNYaF+i7c7U5vCAAbx09bmrrTbg43VanfuyMzej5cZPZE+Vpz66+zgmaHXdIDRWGfLOE3wz9LqvMHNRVfJKEHPTV714OLlqa/ciZLTYG7KK0PHFjbgmKDC7Y9GAAAMo0lEQVR4nO2de3uaSBTGYYHhriAgXjBETNQYNWmz1XbbTbftttvv/4kWBhguIl7KZGye+f3TJkaclzmcOXPmzMgwFAqFQqFQKBQKhUKhUCgUCoVCoVAoFAqFQqFQKBQKhUIWz+iQbgIm3M5Esea2vZU1czGdkG5O49i+o/GcJAktnWVZ0JIXirt1SbeqSVyNLaJzgsqPSDerGVxj2F+rgC0T/sackm7cr2NM701eUPVdgRB+TLqBv4bS09rwudtP6550I8/H6MtchW2WEdnf09+4w412hDzocn5HiZ2BKR0nD/bihnR7TyUYm+rR8iLUGekmn0SwNMWT9IVwv9Gg0Rmfri/ED0g3/EjcgX+OvtDb/CZjxlA+7fnLwVuBYUw6l+1VjQ13vP/cQWq3+bbm8Ev7YmcdffMX9CGALmjsnLSWKrrS2Qa6q5JfXJ61Kn4THYi4vBhAWTQqMBwgh6QlFWnmEcwDdNKaCnh2/QTpHOQLylYpM7PVuECW65LWlTIH7eY7MES6jBHDnWonTJJOU3gJrsZdmS1M+kKFFml5UF/DqnRdbQlSbBUc8Tzj1GlEH9DFSBXX1mRTvB/3p0NrtI0kaoSnU5YknG+fUJUkRXG2A9bjQaRq4qE4bQvDP5lo3DZZ8CfqA6kqTXZkdtsbTOfdUeDlrvn+ffyvp8MJJtCIKEvom0eND1BVaIChKlPbzHore941CqqYr4/Pbz68ffryz83Dl/g3nhBfW1+TUBbT5WomESB0FmryWHGLZayqU1D1/vHP52/v/vr46erh7u7m9vb6+urqj6tEIAOSm6cOCEiLGcuVj1XSV8L9sj+1LcUoTtbff/37+dvPt98///fwcHdzE6vKc5384Sy9e8SGQyOZBVa4QKWcggg7682Hf5++/LiFqm7LqnLcfovfMm+nt43UotTKL7nAwCup+gpN8PunP/Z0VjV3iZvJAiTZq/h4/Kz6sQssq3qMTBD6i0OdtYeH+EpdDlk+T0BekdgEQ39xnfiLq5Nl7fbhAPkwfUlGVeQvQhP8fJoJHsH1W/gBY5RrbdkvpsrNDVlnmmA9V9e3Nw9Xn75GH5b1oYY5oxgNWR/KQ1bTRNLubj7/9eH5a/q5o/Q5BAI+cR8+/3fXsAlWSnv48fTuzWMaqRnWKhr/ulJqpPgWat4/YJIFpUGL/OPj229/JtKYoGv317LMS3KocOKnRurjGys+4hEIpd2GFvlnapHeaL5aqqYmCSqM06IJry2kXYgvZHt8wCDt7u7T08/nx+Qj3Ik17S1MjZfUfPwuhH3YSfoQSNgEMj+ak3YVPWz/ff/3zd+pRXaU4WDLhxbZEnfnXnB1TYGdCEx8jvTNTRPaoPv/Ej5syCKN+XTMmhq3v6omnEwsu8oQZs5NjCHp9S9LCy0y5/7dyJHcO3u6rdyLEgfzWhzGwf7dmQpj9//P98z9x46k5SBHcjw4p77vT3czu+4fOpJN7EjOyuTIGDNQTyeMFMj9ZwEJdCRt5yiLrOnCLT6Bx40UsUV+enr3nFlk5EjAAUdyLDgTwZ8OSIvd/8ec+z/JkRyJiU/g896RAlrkdd79M53QkcwEp326IzmA2sensOIhTN3/z+xhSx0Jd64jOYCMb7D/ebvzsBXcP3Qka01uN2iRu2AcKtyHnEVe5d1/qG2+asyR1AJaPr6F36fbSFpxPppyz+OWFsFrJrvCN2l6vMq7/yIdp0EdQNdFVW0JgiRxvJTzUqZBJn0Y0TuyFC9a+QvhOI7n+bYWseNnwWY27vVXU3s4t5RRd5Flnsgl8ZnArOoJVYgyw5osa1qbD8cMEcj2MGy21e0qo5ExCYJOx2PGZYm8Ubx4WoUDRDLiIPelVuoC74jj1bBrBB0vpBMY3eFqrO5OebxleQ0VOIxn2/YUZZTnyazeJ1isZ3P5FqqcubSNo9YuvcHuGlw4nnd9QfBRTw5jhRrBqoS8jQLJ6SvpC25Q4xncYL6sqvQ2A2Ya9quESmVWamShQg+viDrcbD+B3t4kFS6TYX9h+nVbXSa+VBXMqaGSDYhzMjFjkdXFHsny4Hvk7PgF7D7XGjvtcOj3a+t5UN6z+BRKLjOJtndl2dANEHWPZF0wchVqPKkZjU1JhP1p7H+TN21xlQKjYvVZ1LfqKv1bRyVbSDpO85cOjPitjRZ3aauuWSO/uopIbYf+0oI79NAKtueT3WcxSwSKfGSgyiatv2jX7jarDBCAao7DuxI48BKoDw2i+9bc+8QZCuuwbe5STgdnsz4XVgoQgNiSeJMdRAPeKCkBENIrkAvUQgI16QstslDLSXtGd+qzmZYUrRyF88cweGtrjrzoTa0JNGp3kJbZOpdQjD9PWwN7rKelj5bKHrjvM13n9aHXDaO3fO1Mx+qhARJnsuloxumeXd+K7DX1OCx3aPHZ8+W1kvsxGFn2YMmamoQeT2ASNU6IgjYWQIFARG07uKw37eXTnT2/zUmlibNo1ow0L4M7Tp0Ka0YCRR0JPFyYXBxGdrbQgJY5I96DbrYzJAqIXTYVKIqnphgmhf3pQJRkdnoB9eldPm2SFA1b0zQAk073D3DFE8TTSU7mevMLkMfkFmJV6FWWSRfKZ0zC1zqr8xvZbG37tkLcOBGbdGSHWzrceAAH9ZF2Na7ZMpcj5tJ2MM3TqDne1LmCD6UunbMgZPkYc2dn48WRY9hpcA43gV0o3J/VD8RHhUo2SYWuBodtD9YKagSn4I2TzHiFBTSvCRRoXsLWjoZwF/CpA3K8ADSFsWn7YvYf/ToKr8ehS7JICatb9AXZRjVKvAtUZZNx2YU2ypHfnNMc66gLs6nNOj7siGSLmgb2GZ/OfeJUsPCK3AwzjyJQVFJm+LHTIdqkholi5CxJFOeCs7zfK6ALtzpk9Tqw2PMCpuPN0YkCNJAbG2yeFV9TNMMwQ77kWJYqxsoIIsxE1iyE2BLB/WNYcDWxmIMevaKALabrvzpJZX7z4+8oFAqFQqFQXj9WNbklo5GRZ8S4RpHi9bzii9Xrap6hpBgeEyCwKJQ5qQpOBklpiOvzeXw3KPyi7RSvZxdeNSs2GbhTUea5FN7ZyFoCnmrvvad5ACnOervF8zBkNyieQF6qgR0K+RcrzvGwy7VT2U/ayyqMkuCr5hVuK2vfCCkMP9JuWuG27ggmAgpZ32hW4bSyPJOkQrBpVGHHZ+vAr7CierKtNKmwX38/8Sg0sxYBXYxxMlsSe4yfb5YajRb5SudW6eQqO39DgFZU6KB7CDjHhGi5ok08Cic2kqNlmwXkrCWM1c8ESwOLcee5jQr8oJTECuzshoCWXYgHDHSSkL5JKx29cXZ1PAqTAuXSB2TlQ46bO1wlzYUje65a38isuHx8npWKAXwuP5sd3YJLISruzX8A0qB5uWKitAQWPU9SVRoSKSwfLjdMFer55J6X/f1LKkzrh2Ar9yusPGy0nX9vnjlSWEiq+2qC+YIKDXRfo7DzRIXaPoXZcVCaUvE+bGQK0XzCQA5Wj4rqm1LYycYZeaCMELi/Bgop1LezmE3WEngibFMKM/sNfRSXm4JoTg9nIVW2jUBPyNoRn9PYmMLBvhEfiM4SX6Vf3U5Kbd6oQq8mahPb2I6NqFGYjH+NKYzWl/cCcLnSOoXgvmGFzLhmcoHtsPI6KxUGDStkejtHaOY+DdNJX5lCtRWT+zIjePhWkwoZi6vcowg70cTjbZBCdWVPI+xBthkbbhlsVGEY2qxNrZ2ROxgc0wEnFSO+u0glwoOqGlYY0gmCSUwQ5PauYzqAtipq89DTEp2q0rzCImt0P/HsjKqMvO9RK2vnFrFCwzcT/OjHUuQ9TV/1e8wW/T+/ByA7NpF9OYWtSoWt6tnTJJ3ZxjWbpdmTjbbcDrKjCAr2qCCFeA4gAPmpYMIUhd6Re1uiDULVM+BsZhsp7JRmwJknyykszAXRHBjLlz/ZyKmwvOHFBH0UegDAWL0slSOtuoxrrbMRNArrAiQ4VNiZZ2EtYI10C/COQiBZbkwHbTvGc9JQ/ksq+GT9oJ0FyGEnFb6MaycTJTlmdk57qNDOfy8L4J1cVqugMJQox+RyUVhGiwNfZeQEh7KJeUKFxWxigaLCqrc7h9vbtEJxdjAj3KBCCUvUVqsw2tj6cgp1gENgrULgK4dXZhpTiGv2VKNQhyWLL6VQ5THNgPfmFVR5DcdHTAqLZ2wB1RnjymKYWiWy1E9yQxWr3Nw+eJOx979q9pmtmQwR5lqSs+mFzPfx1V13qsnV6o+KMG5X2Q/TqXlxwniIMLqfIF7TzgAKhUKhUCgUCoVCoVAoFAqFQqFQKBQKhUKhUCgUCoUA/wPlSUGSEqxujQAAAABJRU5ErkJggg==",
        "https://www.buffalobills.com"
    ],

    "Chicago Bears": [
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSw0b96mtc6nRBK6iYIovmrLj2lv9yNQ50HNQ&usqp=CAU",
        "https://www.chicagobears.com/"
    ],
    
    "Cincinnati Bengals": [
        "data:image/png;base64,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",
        "https://www.bengals.com/"
    ],
}

const Utils = {

    GetTime: function (time) {
        return {
            id: time,
            title: time,
            image: this.GetTimeUrlLogo(time),
            url: this.GetTimeWebSite(time)
        }
    },

    GetTimeUrlLogo: function (time) {
        return dicTimes[time][0];
    },

    GetTimeWebSite: function (time) {
        return dicTimes[time][1];
    },

    GetTimes: function () {
        return [this.GetTime('Chicago Bears')];
    },

    GetFavorites: function () {
        const pessoasFavoritas = [
            'juunegreiros',
            'omariosouto',
            'peas',
            'rafaballerini',
            'marcobrunodev',
            'felipefialho'
        ];

        return pessoasFavoritas.map((item) => {
            return {
                id: item,
                title: item,
                image: `https://github.com/${item}.png`,
                url: `https://github.com/${item}`
            }
        })
    },
}

export default Utils;