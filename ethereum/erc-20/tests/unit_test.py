from brownie import accounts, Decha
import pytest

@pytest.fixture
def token():
  return accounts[0].deploy(Decha, 10000)
  
def test_token_balance(token):
  assert token.balanceOf(accounts[0]) == 10000

def test_token_name(token):
  assert token.name() == "DeCharity Token"

def test_token_symbol(token):
  assert token.symbol() == "DECHA"

def test_token_decimals(token):
  assert token.decimals() == "18"

def test_token_total_supply(token):
  assert token.totalSupply() == 10000

def test_token_transfer(token):
  token.transfer(accounts[1], 10)
  assert token.balanceOf(accounts[0]) == 9990
  assert token.balanceOf(accounts[1]) == 10

def test_allowance(token):
  assert token.allowance(accounts[0], accounts[1]) == 0

def test_approve(token):
  token.transfer(accounts[1], 10)
  token.approve(accounts[1], 10)
  assert token.allowance(accounts[0], accounts[1]) == 10

def test_transfer_from(token):
  token.approve(accounts[0], 100)
  token.transferFrom(accounts[0], accounts[1], 100)
  assert True
