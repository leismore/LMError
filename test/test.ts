import { assert }            from 'chai';
import { LMError, Err, Res } from '../src/index';

const err_valid:Err = {
    message: 'an error message',
    code:    'error_code_2584'
};

const err_invalid:Err = {
    message: '',
    code:    'error code 2584'
};

const res_valid:Res = {
    statusCode: '500',
    headers: {
        'Content-Type': 'text/html',
        'Content-Language': 'en-GB'
    },
    body: '<p>Something is wrong</p>'
};

const res_invalid:Res = {
    statusCode: '12',
    headers: {
        'no':  '',
        'non': ''
    }
};

const error   = new Error('standard Error');
const lmerror = new LMError(err_valid, res_valid, error);
const now     = new Date();

describe('LMError class Initialisation', function(){
    it('With all parameters', function(){
        new LMError(err_valid, res_valid, lmerror);
    });
    it('With err only', function(){
        new LMError(err_valid);
    });
    it('With err and res', function(){
        new LMError(err_valid, res_valid);
    });
    it('With err and previous', function(){
        new LMError(err_valid, undefined, lmerror);
    });
    it('With invalid err', function(){
        assert.throws(function(){
            new LMError(err_invalid, res_valid, lmerror);
        }, Error, 'invalid_error_message');
    });
    it('With invalid res', function(){
        assert.throws(function(){
            new LMError(err_valid, res_invalid, lmerror);
        }, Error, 'invalid_http_statusCode');
    });
});

describe('LMError class: Adding a previous error', function(){
    it('With a standard error', function(){
        let e = new LMError(err_valid, res_valid);
        e.addPrevious(error);
    });
    it('With a LMError error', function(){
        let e = new LMError(err_valid, res_valid);
        e.addPrevious(lmerror);
    });
});

describe('LMError class: toString', function(){
    it('Should return a non-empty string', function(){
        let e = new LMError(err_valid, res_valid, lmerror);
        let t = String(e);
        assert((typeof t === 'string' && t.length > 0), 'invalid string');
    });
});
