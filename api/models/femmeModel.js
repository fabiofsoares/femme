'use strict';
let mongoose = require('mongoose');
let Schema = mongoose.Schema;



// let CountrieSchema = new Schema({
//     "_id": {
//         "type": "object",
//         "properties": {
//         "$oid": {
//             "type": "string"
//         }
//         },
//         "required": [
//         "$oid"
//         ]
//     },
//     "country": {
//         "type": "string"
//     },
//     "statistical": {
//         "type": "array",
//         "items": [
//         {
//             "type": "object",
//             "properties": {
//             "year": {
//                 "type": "string"
//             },
//             "data": {
//                 "type": "array",
//                 "items": [
//                 {
//                     "type": "object",
//                     "properties": {
//                     "type": {
//                         "type": "string"
//                     },
//                     "source": {
//                         "type": "string"
//                     },
//                     "data": {
//                         "type": "object",
//                         "properties": {
//                         "m": {
//                             "type": "integer"
//                         },
//                         "f": {
//                             "type": "integer"
//                         },
//                         "ratio": {
//                             "type": "integer"
//                         }
//                         },
//                         "required": [
//                         "m",
//                         "f",
//                         "ratio"
//                         ]
//                     }
//                     },
//                     "required": [
//                     "type",
//                     "source",
//                     "data"
//                     ]
//                 },
//                 {
//                     "type": "object",
//                     "properties": {
//                     "type": {
//                         "type": "string"
//                     },
//                     "source": {
//                         "type": "string"
//                     },
//                     "data": {
//                         "type": "object",
//                         "properties": {
//                         "m": {
//                             "type": "integer"
//                         },
//                         "f": {
//                             "type": "integer"
//                         },
//                         "ratio": {
//                             "type": "number"
//                         }
//                         },
//                         "required": [
//                         "m",
//                         "f",
//                         "ratio"
//                         ]
//                     }
//                     },
//                     "required": [
//                     "type",
//                     "source",
//                     "data"
//                     ]
//                 },
//                 {
//                     "type": "object",
//                     "properties": {
//                     "type": {
//                         "type": "string"
//                     },
//                     "source": {
//                         "type": "string"
//                     },
//                     "data": {
//                         "type": "object",
//                         "properties": {
//                         "m": {
//                             "type": "integer"
//                         },
//                         "f": {
//                             "type": "integer"
//                         }
//                         },
//                         "required": [
//                         "m",
//                         "f"
//                         ]
//                     }
//                     },
//                     "required": [
//                     "type",
//                     "source",
//                     "data"
//                     ]
//                 },
//                 {
//                     "type": "object",
//                     "properties": {
//                     "type": {
//                         "type": "string"
//                     },
//                     "source": {
//                         "type": "string"
//                     },
//                     "data": {
//                         "type": "object",
//                         "properties": {
//                         "m": {
//                             "type": "integer"
//                         },
//                         "f": {
//                             "type": "integer"
//                         }
//                         },
//                         "required": [
//                         "m",
//                         "f"
//                         ]
//                     }
//                     },
//                     "required": [
//                     "type",
//                     "source",
//                     "data"
//                     ]
//                 },
//                 {
//                     "type": "object",
//                     "properties": {
//                     "type": {
//                         "type": "string"
//                     },
//                     "source": {
//                         "type": "string"
//                     },
//                     "data": {
//                         "type": "object",
//                         "properties": {
//                         "m": {
//                             "type": "integer"
//                         },
//                         "f": {
//                             "type": "integer"
//                         }
//                         },
//                         "required": [
//                         "m",
//                         "f"
//                         ]
//                     }
//                     },
//                     "required": [
//                     "type",
//                     "source",
//                     "data"
//                     ]
//                 },
//                 {
//                     "type": "object",
//                     "properties": {
//                     "type": {
//                         "type": "string"
//                     },
//                     "source": {
//                         "type": "string"
//                     },
//                     "data": {
//                         "type": "object",
//                         "properties": {
//                         "m": {
//                             "type": "integer"
//                         },
//                         "f": {
//                             "type": "integer"
//                         }
//                         },
//                         "required": [
//                         "m",
//                         "f"
//                         ]
//                     }
//                     },
//                     "required": [
//                     "type",
//                     "source",
//                     "data"
//                     ]
//                 },
//                 {
//                     "type": "object",
//                     "properties": {
//                     "type": {
//                         "type": "string"
//                     },
//                     "source": {
//                         "type": "string"
//                     },
//                     "data": {
//                         "type": "object",
//                         "properties": {
//                         "m": {
//                             "type": "integer"
//                         },
//                         "f": {
//                             "type": "integer"
//                         }
//                         },
//                         "required": [
//                         "m",
//                         "f"
//                         ]
//                     }
//                     },
//                     "required": [
//                     "type",
//                     "source",
//                     "data"
//                     ]
//                 },
//                 {
//                     "type": "object",
//                     "properties": {
//                     "type": {
//                         "type": "string"
//                     },
//                     "source": {
//                         "type": "string"
//                     },
//                     "data": {
//                         "type": "object",
//                         "properties": {
//                         "m": {
//                             "type": "integer"
//                         },
//                         "f": {
//                             "type": "integer"
//                         }
//                         },
//                         "required": [
//                         "m",
//                         "f"
//                         ]
//                     }
//                     },
//                     "required": [
//                     "type",
//                     "source",
//                     "data"
//                     ]
//                 },
//                 {
//                     "type": "object",
//                     "properties": {
//                     "type": {
//                         "type": "string"
//                     },
//                     "source": {
//                         "type": "string"
//                     },
//                     "data": {
//                         "type": "object",
//                         "properties": {
//                         "m": {
//                             "type": "integer"
//                         },
//                         "f": {
//                             "type": "integer"
//                         }
//                         },
//                         "required": [
//                         "m",
//                         "f"
//                         ]
//                     }
//                     },
//                     "required": [
//                     "type",
//                     "source",
//                     "data"
//                     ]
//                 },
//                 {
//                     "type": "object",
//                     "properties": {
//                     "type": {
//                         "type": "string"
//                     },
//                     "source": {
//                         "type": "string"
//                     },
//                     "data": {
//                         "type": "object",
//                         "properties": {
//                         "m": {
//                             "type": "integer"
//                         },
//                         "f": {
//                             "type": "integer"
//                         }
//                         },
//                         "required": [
//                         "m",
//                         "f"
//                         ]
//                     }
//                     },
//                     "required": [
//                     "type",
//                     "source",
//                     "data"
//                     ]
//                 },
//                 {
//                     "type": "object",
//                     "properties": {
//                     "type": {
//                         "type": "string"
//                     },
//                     "source": {
//                         "type": "string"
//                     },
//                     "data": {
//                         "type": "object",
//                         "properties": {
//                         "m": {
//                             "type": "integer"
//                         },
//                         "f": {
//                             "type": "integer"
//                         }
//                         },
//                         "required": [
//                         "m",
//                         "f"
//                         ]
//                     }
//                     },
//                     "required": [
//                     "type",
//                     "source",
//                     "data"
//                     ]
//                 },
//                 {
//                     "type": "object",
//                     "properties": {
//                     "type": {
//                         "type": "string"
//                     },
//                     "source": {
//                         "type": "string"
//                     },
//                     "data": {
//                         "type": "object",
//                         "properties": {
//                         "m": {
//                             "type": "integer"
//                         },
//                         "f": {
//                             "type": "integer"
//                         }
//                         },
//                         "required": [
//                         "m",
//                         "f"
//                         ]
//                     }
//                     },
//                     "required": [
//                     "type",
//                     "source",
//                     "data"
//                     ]
//                 },
//                 {
//                     "type": "object",
//                     "properties": {
//                     "type": {
//                         "type": "string"
//                     },
//                     "source": {
//                         "type": "string"
//                     },
//                     "data": {
//                         "type": "object",
//                         "properties": {
//                         "m": {
//                             "type": "integer"
//                         },
//                         "f": {
//                             "type": "integer"
//                         }
//                         },
//                         "required": [
//                         "m",
//                         "f"
//                         ]
//                     }
//                     },
//                     "required": [
//                     "type",
//                     "source",
//                     "data"
//                     ]
//                 }
//                 ]
//             }
//             },
//             "required": [
//             "year",
//             "data"
//             ]
//         },
//         {
//             "type": "object",
//             "properties": {
//             "year": {
//                 "type": "string"
//             },
//             "data": {
//                 "type": "array",
//                 "items": [
//                 {
//                     "type": "object",
//                     "properties": {
//                     "type": {
//                         "type": "string"
//                     },
//                     "source": {
//                         "type": "string"
//                     },
//                     "data": {
//                         "type": "object",
//                         "properties": {
//                         "m": {
//                             "type": "integer"
//                         },
//                         "f": {
//                             "type": "integer"
//                         },
//                         "ratio": {
//                             "type": "integer"
//                         }
//                         },
//                         "required": [
//                         "m",
//                         "f",
//                         "ratio"
//                         ]
//                     }
//                     },
//                     "required": [
//                     "type",
//                     "source",
//                     "data"
//                     ]
//                 },
//                 {
//                     "type": "object",
//                     "properties": {
//                     "type": {
//                         "type": "string"
//                     },
//                     "source": {
//                         "type": "string"
//                     },
//                     "data": {
//                         "type": "object",
//                         "properties": {
//                         "m": {
//                             "type": "integer"
//                         },
//                         "f": {
//                             "type": "integer"
//                         },
//                         "ratio": {
//                             "type": "number"
//                         }
//                         },
//                         "required": [
//                         "m",
//                         "f",
//                         "ratio"
//                         ]
//                     }
//                     },
//                     "required": [
//                     "type",
//                     "source",
//                     "data"
//                     ]
//                 },
//                 {
//                     "type": "object",
//                     "properties": {
//                     "type": {
//                         "type": "string"
//                     },
//                     "source": {
//                         "type": "string"
//                     },
//                     "data": {
//                         "type": "object",
//                         "properties": {
//                         "m": {
//                             "type": "integer"
//                         },
//                         "f": {
//                             "type": "integer"
//                         }
//                         },
//                         "required": [
//                         "m",
//                         "f"
//                         ]
//                     }
//                     },
//                     "required": [
//                     "type",
//                     "source",
//                     "data"
//                     ]
//                 },
//                 {
//                     "type": "object",
//                     "properties": {
//                     "type": {
//                         "type": "string"
//                     },
//                     "source": {
//                         "type": "string"
//                     },
//                     "data": {
//                         "type": "object",
//                         "properties": {
//                         "m": {
//                             "type": "integer"
//                         },
//                         "f": {
//                             "type": "integer"
//                         }
//                         },
//                         "required": [
//                         "m",
//                         "f"
//                         ]
//                     }
//                     },
//                     "required": [
//                     "type",
//                     "source",
//                     "data"
//                     ]
//                 },
//                 {
//                     "type": "object",
//                     "properties": {
//                     "type": {
//                         "type": "string"
//                     },
//                     "source": {
//                         "type": "string"
//                     },
//                     "data": {
//                         "type": "object",
//                         "properties": {
//                         "m": {
//                             "type": "integer"
//                         },
//                         "f": {
//                             "type": "integer"
//                         }
//                         },
//                         "required": [
//                         "m",
//                         "f"
//                         ]
//                     }
//                     },
//                     "required": [
//                     "type",
//                     "source",
//                     "data"
//                     ]
//                 },
//                 {
//                     "type": "object",
//                     "properties": {
//                     "type": {
//                         "type": "string"
//                     },
//                     "source": {
//                         "type": "string"
//                     },
//                     "data": {
//                         "type": "object",
//                         "properties": {
//                         "m": {
//                             "type": "integer"
//                         },
//                         "f": {
//                             "type": "integer"
//                         }
//                         },
//                         "required": [
//                         "m",
//                         "f"
//                         ]
//                     }
//                     },
//                     "required": [
//                     "type",
//                     "source",
//                     "data"
//                     ]
//                 },
//                 {
//                     "type": "object",
//                     "properties": {
//                     "type": {
//                         "type": "string"
//                     },
//                     "source": {
//                         "type": "string"
//                     },
//                     "data": {
//                         "type": "object",
//                         "properties": {
//                         "m": {
//                             "type": "integer"
//                         },
//                         "f": {
//                             "type": "integer"
//                         }
//                         },
//                         "required": [
//                         "m",
//                         "f"
//                         ]
//                     }
//                     },
//                     "required": [
//                     "type",
//                     "source",
//                     "data"
//                     ]
//                 },
//                 {
//                     "type": "object",
//                     "properties": {
//                     "type": {
//                         "type": "string"
//                     },
//                     "source": {
//                         "type": "string"
//                     },
//                     "data": {
//                         "type": "object",
//                         "properties": {
//                         "m": {
//                             "type": "integer"
//                         },
//                         "f": {
//                             "type": "integer"
//                         }
//                         },
//                         "required": [
//                         "m",
//                         "f"
//                         ]
//                     }
//                     },
//                     "required": [
//                     "type",
//                     "source",
//                     "data"
//                     ]
//                 },
//                 {
//                     "type": "object",
//                     "properties": {
//                     "type": {
//                         "type": "string"
//                     },
//                     "source": {
//                         "type": "string"
//                     },
//                     "data": {
//                         "type": "object",
//                         "properties": {
//                         "m": {
//                             "type": "integer"
//                         },
//                         "f": {
//                             "type": "integer"
//                         }
//                         },
//                         "required": [
//                         "m",
//                         "f"
//                         ]
//                     }
//                     },
//                     "required": [
//                     "type",
//                     "source",
//                     "data"
//                     ]
//                 },
//                 {
//                     "type": "object",
//                     "properties": {
//                     "type": {
//                         "type": "string"
//                     },
//                     "source": {
//                         "type": "string"
//                     },
//                     "data": {
//                         "type": "object",
//                         "properties": {
//                         "m": {
//                             "type": "integer"
//                         },
//                         "f": {
//                             "type": "integer"
//                         }
//                         },
//                         "required": [
//                         "m",
//                         "f"
//                         ]
//                     }
//                     },
//                     "required": [
//                     "type",
//                     "source",
//                     "data"
//                     ]
//                 },
//                 {
//                     "type": "object",
//                     "properties": {
//                     "type": {
//                         "type": "string"
//                     },
//                     "source": {
//                         "type": "string"
//                     },
//                     "data": {
//                         "type": "object",
//                         "properties": {
//                         "m": {
//                             "type": "integer"
//                         },
//                         "f": {
//                             "type": "integer"
//                         }
//                         },
//                         "required": [
//                         "m",
//                         "f"
//                         ]
//                     }
//                     },
//                     "required": [
//                     "type",
//                     "source",
//                     "data"
//                     ]
//                 },
//                 {
//                     "type": "object",
//                     "properties": {
//                     "type": {
//                         "type": "string"
//                     },
//                     "source": {
//                         "type": "string"
//                     },
//                     "data": {
//                         "type": "object",
//                         "properties": {
//                         "m": {
//                             "type": "integer"
//                         },
//                         "f": {
//                             "type": "integer"
//                         }
//                         },
//                         "required": [
//                         "m",
//                         "f"
//                         ]
//                     }
//                     },
//                     "required": [
//                     "type",
//                     "source",
//                     "data"
//                     ]
//                 },
//                 {
//                     "type": "object",
//                     "properties": {
//                     "type": {
//                         "type": "string"
//                     },
//                     "source": {
//                         "type": "string"
//                     },
//                     "data": {
//                         "type": "object",
//                         "properties": {
//                         "m": {
//                             "type": "integer"
//                         },
//                         "f": {
//                             "type": "integer"
//                         }
//                         },
//                         "required": [
//                         "m",
//                         "f"
//                         ]
//                     }
//                     },
//                     "required": [
//                     "type",
//                     "source",
//                     "data"
//                     ]
//                 }
//                 ]
//             }
//             },
//             "required": [
//             "year",
//             "data"
//             ]
//         },
//         {
//             "type": "object",
//             "properties": {
//             "year": {
//                 "type": "string"
//             },
//             "data": {
//                 "type": "array",
//                 "items": [
//                 {
//                     "type": "object",
//                     "properties": {
//                     "type": {
//                         "type": "string"
//                     },
//                     "source": {
//                         "type": "string"
//                     },
//                     "data": {
//                         "type": "object",
//                         "properties": {
//                         "m": {
//                             "type": "integer"
//                         },
//                         "f": {
//                             "type": "integer"
//                         },
//                         "ratio": {
//                             "type": "integer"
//                         }
//                         },
//                         "required": [
//                         "m",
//                         "f",
//                         "ratio"
//                         ]
//                     }
//                     },
//                     "required": [
//                     "type",
//                     "source",
//                     "data"
//                     ]
//                 },
//                 {
//                     "type": "object",
//                     "properties": {
//                     "type": {
//                         "type": "string"
//                     },
//                     "source": {
//                         "type": "string"
//                     },
//                     "data": {
//                         "type": "object",
//                         "properties": {
//                         "m": {
//                             "type": "integer"
//                         },
//                         "f": {
//                             "type": "integer"
//                         },
//                         "ratio": {
//                             "type": "number"
//                         }
//                         },
//                         "required": [
//                         "m",
//                         "f",
//                         "ratio"
//                         ]
//                     }
//                     },
//                     "required": [
//                     "type",
//                     "source",
//                     "data"
//                     ]
//                 },
//                 {
//                     "type": "object",
//                     "properties": {
//                     "type": {
//                         "type": "string"
//                     },
//                     "source": {
//                         "type": "string"
//                     },
//                     "data": {
//                         "type": "object",
//                         "properties": {
//                         "m": {
//                             "type": "integer"
//                         },
//                         "f": {
//                             "type": "integer"
//                         }
//                         },
//                         "required": [
//                         "m",
//                         "f"
//                         ]
//                     }
//                     },
//                     "required": [
//                     "type",
//                     "source",
//                     "data"
//                     ]
//                 },
//                 {
//                     "type": "object",
//                     "properties": {
//                     "type": {
//                         "type": "string"
//                     },
//                     "source": {
//                         "type": "string"
//                     },
//                     "data": {
//                         "type": "object",
//                         "properties": {
//                         "m": {
//                             "type": "integer"
//                         },
//                         "f": {
//                             "type": "integer"
//                         }
//                         },
//                         "required": [
//                         "m",
//                         "f"
//                         ]
//                     }
//                     },
//                     "required": [
//                     "type",
//                     "source",
//                     "data"
//                     ]
//                 },
//                 {
//                     "type": "object",
//                     "properties": {
//                     "type": {
//                         "type": "string"
//                     },
//                     "source": {
//                         "type": "string"
//                     },
//                     "data": {
//                         "type": "object",
//                         "properties": {
//                         "m": {
//                             "type": "integer"
//                         },
//                         "f": {
//                             "type": "integer"
//                         }
//                         },
//                         "required": [
//                         "m",
//                         "f"
//                         ]
//                     }
//                     },
//                     "required": [
//                     "type",
//                     "source",
//                     "data"
//                     ]
//                 },
//                 {
//                     "type": "object",
//                     "properties": {
//                     "type": {
//                         "type": "string"
//                     },
//                     "source": {
//                         "type": "string"
//                     },
//                     "data": {
//                         "type": "object",
//                         "properties": {
//                         "m": {
//                             "type": "integer"
//                         },
//                         "f": {
//                             "type": "integer"
//                         }
//                         },
//                         "required": [
//                         "m",
//                         "f"
//                         ]
//                     }
//                     },
//                     "required": [
//                     "type",
//                     "source",
//                     "data"
//                     ]
//                 },
//                 {
//                     "type": "object",
//                     "properties": {
//                     "type": {
//                         "type": "string"
//                     },
//                     "source": {
//                         "type": "string"
//                     },
//                     "data": {
//                         "type": "object",
//                         "properties": {
//                         "m": {
//                             "type": "integer"
//                         },
//                         "f": {
//                             "type": "integer"
//                         }
//                         },
//                         "required": [
//                         "m",
//                         "f"
//                         ]
//                     }
//                     },
//                     "required": [
//                     "type",
//                     "source",
//                     "data"
//                     ]
//                 },
//                 {
//                     "type": "object",
//                     "properties": {
//                     "type": {
//                         "type": "string"
//                     },
//                     "source": {
//                         "type": "string"
//                     },
//                     "data": {
//                         "type": "object",
//                         "properties": {
//                         "m": {
//                             "type": "integer"
//                         },
//                         "f": {
//                             "type": "integer"
//                         }
//                         },
//                         "required": [
//                         "m",
//                         "f"
//                         ]
//                     }
//                     },
//                     "required": [
//                     "type",
//                     "source",
//                     "data"
//                     ]
//                 },
//                 {
//                     "type": "object",
//                     "properties": {
//                     "type": {
//                         "type": "string"
//                     },
//                     "source": {
//                         "type": "string"
//                     },
//                     "data": {
//                         "type": "object",
//                         "properties": {
//                         "m": {
//                             "type": "integer"
//                         },
//                         "f": {
//                             "type": "integer"
//                         }
//                         },
//                         "required": [
//                         "m",
//                         "f"
//                         ]
//                     }
//                     },
//                     "required": [
//                     "type",
//                     "source",
//                     "data"
//                     ]
//                 },
//                 {
//                     "type": "object",
//                     "properties": {
//                     "type": {
//                         "type": "string"
//                     },
//                     "source": {
//                         "type": "string"
//                     },
//                     "data": {
//                         "type": "object",
//                         "properties": {
//                         "m": {
//                             "type": "integer"
//                         },
//                         "f": {
//                             "type": "integer"
//                         }
//                         },
//                         "required": [
//                         "m",
//                         "f"
//                         ]
//                     }
//                     },
//                     "required": [
//                     "type",
//                     "source",
//                     "data"
//                     ]
//                 },
//                 {
//                     "type": "object",
//                     "properties": {
//                     "type": {
//                         "type": "string"
//                     },
//                     "source": {
//                         "type": "string"
//                     },
//                     "data": {
//                         "type": "object",
//                         "properties": {
//                         "m": {
//                             "type": "integer"
//                         },
//                         "f": {
//                             "type": "integer"
//                         }
//                         },
//                         "required": [
//                         "m",
//                         "f"
//                         ]
//                     }
//                     },
//                     "required": [
//                     "type",
//                     "source",
//                     "data"
//                     ]
//                 },
//                 {
//                     "type": "object",
//                     "properties": {
//                     "type": {
//                         "type": "string"
//                     },
//                     "source": {
//                         "type": "string"
//                     },
//                     "data": {
//                         "type": "object",
//                         "properties": {
//                         "m": {
//                             "type": "integer"
//                         },
//                         "f": {
//                             "type": "integer"
//                         }
//                         },
//                         "required": [
//                         "m",
//                         "f"
//                         ]
//                     }
//                     },
//                     "required": [
//                     "type",
//                     "source",
//                     "data"
//                     ]
//                 },
//                 {
//                     "type": "object",
//                     "properties": {
//                     "type": {
//                         "type": "string"
//                     },
//                     "source": {
//                         "type": "string"
//                     },
//                     "data": {
//                         "type": "object",
//                         "properties": {
//                         "m": {
//                             "type": "integer"
//                         },
//                         "f": {
//                             "type": "integer"
//                         }
//                         },
//                         "required": [
//                         "m",
//                         "f"
//                         ]
//                     }
//                     },
//                     "required": [
//                     "type",
//                     "source",
//                     "data"
//                     ]
//                 }
//                 ]
//             }
//             },
//             "required": [
//             "year",
//             "data"
//             ]
//         }
//         ]
//     },
//     "general": {
//         "type": "array",
//         "items": [
//         {
//             "type": "object",
//             "properties": {
//             "year": {
//                 "type": "integer"
//             },
//             "source": {
//                 "type": "string"
//             },
//             "data": {
//                 "type": "object",
//                 "properties": {
//                 "area": {
//                     "type": "integer"
//                 },
//                 "population": {
//                     "type": "integer"
//                 },
//                 "pib": {
//                     "type": "integer"
//                 },
//                 "ppa": {
//                     "type": "integer"
//                 },
//                 "idh": {
//                     "type": "integer"
//                 },
//                 "unemployment": {
//                     "type": "integer"
//                 }
//                 },
//                 "required": [
//                 "area",
//                 "population",
//                 "pib",
//                 "ppa",
//                 "idh",
//                 "unemployment"
//                 ]
//             }
//             },
//             "required": [
//             "year",
//             "source",
//             "data"
//             ]
//         },
//         {
//             "type": "object",
//             "properties": {
//             "year": {
//                 "type": "integer"
//             },
//             "source": {
//                 "type": "string"
//             },
//             "data": {
//                 "type": "object",
//                 "properties": {
//                 "area": {
//                     "type": "integer"
//                 },
//                 "population": {
//                     "type": "integer"
//                 },
//                 "pib": {
//                     "type": "integer"
//                 },
//                 "ppa": {
//                     "type": "integer"
//                 },
//                 "idh": {
//                     "type": "integer"
//                 },
//                 "unemployment": {
//                     "type": "integer"
//                 }
//                 },
//                 "required": [
//                 "area",
//                 "population",
//                 "pib",
//                 "ppa",
//                 "idh",
//                 "unemployment"
//                 ]
//             }
//             },
//             "required": [
//             "year",
//             "source",
//             "data"
//             ]
//         },
//         {
//             "type": "object",
//             "properties": {
//             "year": {
//                 "type": "string"
//             },
//             "source": {
//                 "type": "string"
//             },
//             "data": {
//                 "type": "object",
//                 "properties": {
//                 "area": {
//                     "type": "integer"
//                 },
//                 "population": {
//                     "type": "integer"
//                 },
//                 "pib": {
//                     "type": "integer"
//                 },
//                 "ppa": {
//                     "type": "integer"
//                 },
//                 "idh": {
//                     "type": "integer"
//                 },
//                 "unemployment": {
//                     "type": "integer"
//                 }
//                 },
//                 "required": [
//                 "area",
//                 "population",
//                 "pib",
//                 "ppa",
//                 "idh",
//                 "unemployment"
//                 ]
//             }
//             },
//             "required": [
//             "year",
//             "source",
//             "data"
//             ]
//         }
//         ]
//     }
// });



let Generator = require('generate-schema')
let json = require('../../bd-json/countries/fr.json')

let schemaGenerated = Generator.json('Countrie', json)
let CountrieSchema = new Schema(schemaGenerated.properties)

module.exports = mongoose.model('Countries', CountrieSchema);
