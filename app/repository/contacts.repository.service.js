angular
    .module('myApp')
    .factory('contactsRepository', contactsRepository);

function contactsRepository($http) {

    var service = {
        getContacts: getContacts,
        updateContact: updateContact,
        createContact: createContact,
        deleteContact: deleteContact
    };

    activate();
    return service;

    function activate() {}

    function getContactsResource() {
        return $http({
            method: 'GET',
            url: 'http://localhost:8050/api/contacts'
        });
    }

    function createContactResource(contact) {
        return $http({
            method: "POST",
            url: 'http://localhost:8050/api/contacts',
            data: contact,
            headers: {
                'Content-Type': 'application/json; charset=utf-8'
            }
        });
    }

    function updateContactResource(contact) {
        return $http({
            method: "PUT",
            url: 'http://localhost:8050/api/contacts',
            data: contact,
            headers: {
                'Content-Type': 'application/json; charset=utf-8'
            }
        });
    }

    function deleteContactResource(id) {
        return $http({
            method: 'DELETE',
            url: `http://localhost:8050/api/contacts/${id}`
        });
    }

    function getContacts() {
        return getContactsResource();
    }


    function createContact(contact) {
        return createContactResource(JSON.stringify(contact));
    }

    function updateContact(contact) {
        return updateContactResource(JSON.stringify({id: contact.id, name: contact.name, birthday: contact.birthday}));
    }

    function deleteContact(id) {
        return deleteContactResource(id);
    }
}
