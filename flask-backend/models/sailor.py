from schema import Schema, And, Use

sailor = Schema({
    "SNAME": And(str, len),
    "RATING": And(Use(int), lambda n: 0 <= n),
    "AGE": And(Use(int), lambda n: 0 <= n)
})
