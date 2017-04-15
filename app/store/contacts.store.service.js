angular
    .module('myApp')
    .factory('contactsStore', contactsStore);

function contactsStore(contactsRepository) {

    var service = {
        clear: clear,
        readContacts: readContacts,
        init: init,
        updateContact: updateContact,
        createContact: createContact,
        removeContact: removeContact
    };

    clear();
    return service;

    function clear() {
        service.contacts = {data: [] };
    }

    function init() {
        return readContacts();
    }

    function readContacts() {
        return contactsRepository.getContacts().then(function (result) {
            if (result) {
                service.contacts.data = result.data;
            }
            return result;
        });
    }

    function removeContact(id) {
        return contactsRepository.deleteContact(id);
    }

    function createContact(newContact) {
        return contactsRepository.createContact(newContact);
    }

    function updateContact(contact) {
        return contactsRepository.updateContact(contact);
    }

}
