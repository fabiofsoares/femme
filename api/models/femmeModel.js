'use strict';
var mongoose = require('mongoose');
var Schema = mongoose.Schema;


var CountrieSchema = new Schema({    
    "_id": {
    "type": "string"
    },
    "country": {
    "type": "string"
    },
    "statistical": {
    "type": "array",
    "items": [
        {
        "type": "object",
        "properties": {
            "year": {
            "type": "string"
            },
            "data": {
            "type": "array",
            "items": [
                {
                "type": "object",
                "properties": {
                    "type": {
                    "type": "string"
                    },
                    "source": {
                    "type": "string"
                    },
                    "data": {
                    "type": "object",
                    "properties": {
                        "m": {
                        "type": "integer"
                        },
                        "f": {
                        "type": "integer"
                        }
                    },
                    "required": [
                        "m",
                        "f"
                    ]
                    }
                },
                "required": [
                    "type",
                    "source",
                    "data"
                ]
                },
                {
                "type": "object",
                "properties": {
                    "type": {
                    "type": "string"
                    },
                    "source": {
                    "type": "string"
                    },
                    "data": {
                    "type": "object",
                    "properties": {
                        "m": {
                        "type": "integer"
                        },
                        "f": {
                        "type": "integer"
                        }
                    },
                    "required": [
                        "m",
                        "f"
                    ]
                    }
                },
                "required": [
                    "type",
                    "source",
                    "data"
                ]
                },
                {
                "type": "object",
                "properties": {
                    "type": {
                    "type": "string"
                    },
                    "source": {
                    "type": "string"
                    },
                    "data": {
                    "type": "object",
                    "properties": {
                        "m": {
                        "type": "integer"
                        },
                        "f": {
                        "type": "integer"
                        }
                    },
                    "required": [
                        "m",
                        "f"
                    ]
                    }
                },
                "required": [
                    "type",
                    "source",
                    "data"
                ]
                },
                {
                "type": "object",
                "properties": {
                    "type": {
                    "type": "string"
                    },
                    "source": {
                    "type": "string"
                    },
                    "data": {
                    "type": "object",
                    "properties": {
                        "m": {
                        "type": "integer"
                        },
                        "f": {
                        "type": "integer"
                        }
                    },
                    "required": [
                        "m",
                        "f"
                    ]
                    }
                },
                "required": [
                    "type",
                    "source",
                    "data"
                ]
                },
                {
                "type": "object",
                "properties": {
                    "type": {
                    "type": "string"
                    },
                    "source": {
                    "type": "string"
                    },
                    "data": {
                    "type": "object",
                    "properties": {
                        "m": {
                        "type": "integer"
                        },
                        "f": {
                        "type": "integer"
                        }
                    },
                    "required": [
                        "m",
                        "f"
                    ]
                    }
                },
                "required": [
                    "type",
                    "source",
                    "data"
                ]
                },
                {
                "type": "object",
                "properties": {
                    "type": {
                    "type": "string"
                    },
                    "source": {
                    "type": "string"
                    },
                    "data": {
                    "type": "object",
                    "properties": {
                        "m": {
                        "type": "integer"
                        },
                        "f": {
                        "type": "integer"
                        }
                    },
                    "required": [
                        "m",
                        "f"
                    ]
                    }
                },
                "required": [
                    "type",
                    "source",
                    "data"
                ]
                },
                {
                "type": "object",
                "properties": {
                    "type": {
                    "type": "string"
                    },
                    "source": {
                    "type": "string"
                    },
                    "data": {
                    "type": "object",
                    "properties": {
                        "m": {
                        "type": "integer"
                        },
                        "f": {
                        "type": "integer"
                        }
                    },
                    "required": [
                        "m",
                        "f"
                    ]
                    }
                },
                "required": [
                    "type",
                    "source",
                    "data"
                ]
                },
                {
                "type": "object",
                "properties": {
                    "type": {
                    "type": "string"
                    },
                    "source": {
                    "type": "string"
                    },
                    "data": {
                    "type": "object",
                    "properties": {
                        "m": {
                        "type": "integer"
                        },
                        "f": {
                        "type": "integer"
                        }
                    },
                    "required": [
                        "m",
                        "f"
                    ]
                    }
                },
                "required": [
                    "type",
                    "source",
                    "data"
                ]
                },
                {
                "type": "object",
                "properties": {
                    "type": {
                    "type": "string"
                    },
                    "source": {
                    "type": "string"
                    },
                    "data": {
                    "type": "object",
                    "properties": {
                        "m": {
                        "type": "integer"
                        },
                        "f": {
                        "type": "integer"
                        }
                    },
                    "required": [
                        "m",
                        "f"
                    ]
                    }
                },
                "required": [
                    "type",
                    "source",
                    "data"
                ]
                },
                {
                "type": "object",
                "properties": {
                    "type": {
                    "type": "string"
                    },
                    "source": {
                    "type": "string"
                    },
                    "data": {
                    "type": "object",
                    "properties": {
                        "m": {
                        "type": "integer"
                        },
                        "f": {
                        "type": "integer"
                        }
                    },
                    "required": [
                        "m",
                        "f"
                    ]
                    }
                },
                "required": [
                    "type",
                    "source",
                    "data"
                ]
                },
                {
                "type": "object",
                "properties": {
                    "type": {
                    "type": "string"
                    },
                    "source": {
                    "type": "string"
                    },
                    "data": {
                    "type": "object",
                    "properties": {
                        "m": {
                        "type": "integer"
                        },
                        "f": {
                        "type": "integer"
                        }
                    },
                    "required": [
                        "m",
                        "f"
                    ]
                    }
                },
                "required": [
                    "type",
                    "source",
                    "data"
                ]
                },
                {
                "type": "object",
                "properties": {
                    "type": {
                    "type": "string"
                    },
                    "source": {
                    "type": "string"
                    },
                    "data": {
                    "type": "object",
                    "properties": {
                        "m": {
                        "type": "integer"
                        },
                        "f": {
                        "type": "integer"
                        }
                    },
                    "required": [
                        "m",
                        "f"
                    ]
                    }
                },
                "required": [
                    "type",
                    "source",
                    "data"
                ]
                },
                {
                "type": "object",
                "properties": {
                    "type": {
                    "type": "string"
                    },
                    "source": {
                    "type": "string"
                    },
                    "data": {
                    "type": "object",
                    "properties": {
                        "m": {
                        "type": "integer"
                        },
                        "f": {
                        "type": "integer"
                        }
                    },
                    "required": [
                        "m",
                        "f"
                    ]
                    }
                },
                "required": [
                    "type",
                    "source",
                    "data"
                ]
                }
            ]
            }
        },
        "required": [
            "year",
            "data"
        ]
        }
    ]
    },
    "general": {
    "type": "object",
    "properties": {
        "year": {
        "type": "integer"
        },
        "source": {
        "type": "string"
        },
        "data": {
        "type": "object",
        "properties": {
            "area": {
            "type": "integer"
            },
            "population": {
            "type": "integer"
            },
            "pib": {
            "type": "integer"
            },
            "ppa": {
            "type": "integer"
            },
            "idh": {
            "type": "integer"
            },
            "unemployment": {
            "type": "integer"
            }
        },
        "required": [
            "area",
            "population",
            "pib",
            "ppa",
            "idh",
            "unemployment"
        ]
        }
    },
    "required": [
        "year",
        "source",
        "data"
    ]
    }
      
});

module.exports = mongoose.model('Countries', CountrieSchema);
