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
        removeContact: removeContact,
        filterContacts: filterContacts,
        addNewContact: addNewContact,
        removeContactById: removeContactById,
        getUpdatedContactData: getUpdatedContactData
    };

    clear();
    const serverErrorMessage = 'Internal server error: 500';

    return service;

    function clear() {
        service.contacts = {data: [] };
        service.errorMessage = '';
    }

    function init() {
        return readContacts();
    }

    function readContacts() {
        return contactsRepository.getContacts().then(function (result) {
            if (result.status !== 200) {
                service.errorMessage = result.statusText;
                return;
            }
            service.contacts.data = result.data;
            return result;
        }).catch(function (error) {
            service.errorMessage = serverErrorMessage;
        });
    }

    function removeContact(id) {
        return contactsRepository.deleteContact(id).then(function (result) {
            if (result.status !== 200) {
                service.errorMessage = result.statusText;
                return;
            }
            service.removeContactById(id);
        }).catch(function (error) {
            service.errorMessage = serverErrorMessage;
        });
    }

    function createContact(newContact) {
        return contactsRepository.createContact(newContact).then(function (result) {
            if (result.status !== 201) {
                service.errorMessage = result.statusText;
                return;
            }
            service.addNewContact(newContact, result.data);
        }).catch(function (error) {
            service.errorMessage = serverErrorMessage;
        });
    }

    function updateContact(contact) {
        return contactsRepository.updateContact(contact).then(function (result) {
            if (result.status !== 200) {
                service.errorMessage = result.statusText;
            }
            return service.getUpdatedContactData(contact.id);
        }).catch(function (error) {
            service.errorMessage = serverErrorMessage;
        });
    }

    function filterContacts(filterData) {
        return filterData ? service.contacts.data.filter(function (contact) {
                return contact.name.includes(filterData);
            }) : service.contacts.data;
    }

    function addNewContact(newContact, id) {
        newContact.id = id;
        service.contacts.data.push(newContact);
    }

    function removeContactById(id) {
        const contactIdToDelete = service.contacts.data.indexOf(service.contacts.data.find(function (contact) {
            return contact.id === id;
        }));
        service.contacts.data.splice(contactIdToDelete, 1);
    }

    function getUpdatedContactData(editContactId) {
        return service.contacts.data.find(function (contact) {
            return contact.id === editContactId;
        });
    }

}
