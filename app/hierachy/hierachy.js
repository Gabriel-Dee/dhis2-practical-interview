const orgUnit = {
  id: "UDSMDHIS2LB",
  name: "UDSM DHIS2 Lab",
  parent: {
    id: "CSE12345678",
    name: "CSE",
    parent: {
      id: "CoICT78767",
      name: "CoICT",
      parent: {
        id: "UDSM1234567",
        name: "UDSM",
      },
    },
  },
};

function produceHierachyString(unit) {
  let hierachy = unit.name;
  while (unit.parent) {
    hierachy += "/" + unit.parent.name;
    unit = unit.parent;
  }
  return hierachy;
}

const hierarchyString = produceHierachyString(orgUnit);
console.log(hierarchyString);
